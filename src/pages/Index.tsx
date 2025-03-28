
import React, { useEffect, useRef } from 'react';
import Logo from '@/components/Logo';
import NotificationForm from '@/components/NotificationForm';
import BurgerChefIcon from '@/components/BurgerChefIcon';
import { cn } from '@/lib/utils';

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  
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

    const elements = [taglineRef.current, descriptionRef.current];
    elements.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => {
      elements.forEach(el => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-restaurant-light to-restaurant-secondary p-4 md:p-8"
    >
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-restaurant-primary opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-restaurant-accent opacity-5 rounded-full blur-3xl"></div>
        </div>
        
        {/* Logo */}
        <div className="mb-4 md:mb-8 relative">
          <div className="absolute -top-8 -left-8 w-16 h-16 opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
            <BurgerChefIcon className="w-full h-full text-restaurant-primary" />
          </div>
          <Logo className="text-center" />
        </div>
        
        {/* Tagline */}
        <div 
          ref={taglineRef} 
          className={cn(
            "stagger-item mb-6 md:mb-8 flex items-center",
          )}
        >
          <div className="h-[1px] w-8 md:w-16 bg-restaurant-dark opacity-20"></div>
          <span className="mx-4 text-restaurant-dark font-medium tracking-widest text-sm md:text-base px-4 py-1 rounded-full bg-white/50 backdrop-blur-sm border border-white/10">
            COMING SOON
          </span>
          <div className="h-[1px] w-8 md:w-16 bg-restaurant-dark opacity-20"></div>
        </div>
        
        {/* Description */}
        <p 
          ref={descriptionRef}
          className="stagger-item text-center text-lg md:text-xl text-restaurant-dark/80 mb-12 md:mb-16 max-w-2xl"
        >
          Get ready for a delicious culinary adventure where gourmet burgers meet theoretical physics. Our restaurant is opening soon!
        </p>
        
        {/* Form */}
        <NotificationForm />
        
        {/* Footer */}
        <div className="mt-16 text-center text-restaurant-dark/60 text-sm">
          <p>© {new Date().getFullYear()} Big Bun Theory. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
