
import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  const logoRef = useRef<HTMLDivElement>(null);
  
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

    if (logoRef.current) {
      observer.observe(logoRef.current);
    }

    return () => {
      if (logoRef.current) {
        observer.unobserve(logoRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={logoRef} 
      className={cn("stagger-item relative", className)}
    >
      <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tighter">
        <span className="text-restaurant-primary">Big</span>{" "}
        <span className="text-restaurant-dark">Bun</span>{" "}
        <span className="text-restaurant-accent">Theory</span>
      </h1>
    </div>
  );
};

export default Logo;
