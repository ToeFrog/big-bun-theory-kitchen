
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PrivacyPolicy = () => {
  return (
    <div className="bg-restaurant-light min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="mb-6">
            <Button
              variant="ghost"
              className="flex items-center text-restaurant-primary"
              asChild
            >
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>

          <h1 className="text-3xl font-bold text-restaurant-dark mb-6">Privacy Policy</h1>
          
          <div className="prose max-w-none text-restaurant-dark/80">
            <h2 className="text-xl font-semibold mb-4">SMS and Email Communication Policy</h2>
            
            <h3 className="text-lg font-medium mb-2">Information We Collect</h3>
            <p className="mb-4">
              When you sign up for notifications from Big Bun Theory, we collect your email address and/or phone number 
              depending on your preferred method of communication.
            </p>
            
            <h3 className="text-lg font-medium mb-2">How We Use Your Information</h3>
            <p className="mb-4">
              We use your contact information solely to send you notifications about our restaurant launch, 
              special promotions, and updates about our services. We do not sell, rent, or share your personal information 
              with third parties for marketing purposes.
            </p>
            
            <h3 className="text-lg font-medium mb-2">Text Message Opt-In</h3>
            <p className="mb-4">
              By providing your phone number and clicking "Notify Me," you are opting in to receive text messages from 
              Big Bun Theory. Message frequency varies. Message and data rates may apply. This consent is not a condition 
              of purchase.
            </p>
            
            <h3 className="text-lg font-medium mb-2">Email Opt-In</h3>
            <p className="mb-4">
              By providing your email and clicking "Notify Me," you consent to receive email communications from 
              Big Bun Theory about our restaurant launch and services.
            </p>
            
            <h3 className="text-lg font-medium mb-2">How to Opt-Out</h3>
            <p className="mb-4">
              <strong>SMS:</strong> You can unsubscribe from text messages at any time by replying "STOP" to any message you receive from us.
            </p>
            <p className="mb-4">
              <strong>Email:</strong> You can unsubscribe from emails by clicking the "Unsubscribe" link included in any email we send.
            </p>
            
            <h3 className="text-lg font-medium mb-2">Data Retention</h3>
            <p className="mb-4">
              We will retain your contact information until you opt out or until we have fulfilled the purpose for which it 
              was collected, whichever comes first.
            </p>
            
            <h3 className="text-lg font-medium mb-2">Contact Us</h3>
            <p className="mb-4">
              If you have any questions about our privacy practices or your personal information, please contact us at 
              privacy@bigbuntheory.com.
            </p>
            
            <h3 className="text-lg font-medium mb-2">Changes to This Policy</h3>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and, if the changes are significant, we will provide a more prominent notice.
            </p>
            
            <p className="text-sm text-restaurant-dark/60 mt-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
