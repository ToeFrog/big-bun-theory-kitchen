
import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, ArrowRight, Loader2 } from "lucide-react";
import { saveSubscription } from "@/services/database";
import { sendSms, formatPhoneForTwilio } from "@/services/twilioMessaging";
import { sendEmail, generateWelcomeEmailHtml } from "@/services/sendgridEmail";
import { Link } from "react-router-dom";

const NotificationForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [activeTab, setActiveTab] = useState('email');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[0-9]{10,15}$/.test(phone.replace(/[^0-9]/g, ''));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === 'email') {
      if (!validateEmail(email)) {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address.",
          variant: "destructive"
        });
        return;
      }
    } else {
      if (!validatePhone(phone)) {
        toast({
          title: "Invalid phone number",
          description: "Please enter a valid phone number.",
          variant: "destructive"
        });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // Save to database
      const subscription = await saveSubscription({
        email: activeTab === 'email' ? email : undefined,
        phone: activeTab === 'phone' ? formatPhoneForTwilio(phone) : undefined
      });

      // Send confirmation via email or SMS
      if (activeTab === 'email') {
        await sendEmail({
          to: email,
          subject: "Big Bun Theory - Launch Notification Confirmation",
          html: generateWelcomeEmailHtml(email)
        });
      } else {
        await sendSms({
          to: formatPhoneForTwilio(phone),
          body: "Thanks for signing up for Big Bun Theory launch notifications! We'll text you when we're open. Reply STOP to unsubscribe."
        });
      }

      // Show success message
      toast({
        title: "Thank you!",
        description: activeTab === 'email' 
          ? "We'll notify you at " + email + " when we launch." 
          : "We'll notify you at " + phone + " when we launch.",
      });

      // Reset form
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Something went wrong",
        description: "We couldn't save your information. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-item');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);

  return (
    <div ref={formRef} className="stagger-item w-full max-w-md mx-auto">
      <div className="glass rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-medium text-restaurant-dark mb-4 text-center">
          Get notified when we launch
        </h3>
        
        <Tabs defaultValue="email" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail size={16} />
              <span>Email</span>
            </TabsTrigger>
            <TabsTrigger value="phone" className="flex items-center gap-2">
              <Phone size={16} />
              <span>Phone</span>
            </TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit}>
            <TabsContent value="email" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                  required
                />
              </div>
            </TabsContent>
            
            <TabsContent value="phone" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(123) 456-7890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12"
                  required
                />
              </div>
            </TabsContent>
            
            <Button 
              type="submit" 
              className="w-full mt-6 bg-restaurant-primary hover:bg-restaurant-accent text-white h-12 flex items-center justify-center group transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Notify Me</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </Button>
            <div className="mt-4 text-center text-xs text-restaurant-dark/60">
              By signing up, you agree to our{' '}
              <Link to="/privacy-policy" className="text-restaurant-primary hover:underline">
                Privacy Policy
              </Link>
              , which includes information on opting in and out of communications.
            </div>
          </form>
        </Tabs>
      </div>
    </div>
  );
};

export default NotificationForm;
