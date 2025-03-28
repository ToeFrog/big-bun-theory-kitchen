
import React from 'react';
import { cn } from "@/lib/utils";

interface BurgerChefIconProps {
  className?: string;
  size?: number;
  color?: string;
}

const BurgerChefIcon: React.FC<BurgerChefIconProps> = ({ 
  className, 
  size = 64,
  color = "currentColor" 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={cn("", className)}
    >
      {/* Chef Hat */}
      <path 
        d="M32 4C27 4 23 7 23 12C23 13.5 23.5 15 24.5 16H39.5C40.5 15 41 13.5 41 12C41 7 37 4 32 4Z" 
        fill="white" 
        stroke={color} 
        strokeWidth="2" 
      />
      <path 
        d="M20 16C18 16 16 17 16 20C16 23 18 24 20 24H44C46 24 48 23 48 20C48 17 46 16 44 16H20Z" 
        fill="white" 
        stroke={color} 
        strokeWidth="2" 
      />
      
      {/* Burger Top Bun */}
      <path 
        d="M15 32C15 28.6863 17.6863 26 21 26H43C46.3137 26 49 28.6863 49 32V34H15V32Z" 
        fill="#E8853D" 
        stroke={color} 
        strokeWidth="2" 
      />
      
      {/* Lettuce */}
      <path 
        d="M14 36C14 35.4477 14.4477 35 15 35H49C49.5523 35 50 35.4477 50 36V37C50 37.5523 49.5523 38 49 38H15C14.4477 38 14 37.5523 14 37V36Z" 
        fill="#4CAF50" 
        stroke={color} 
        strokeWidth="1" 
      />
      
      {/* Patty */}
      <path 
        d="M16 39C16 38.4477 16.4477 38 17 38H47C47.5523 38 48 38.4477 48 39V43C48 43.5523 47.5523 44 47 44H17C16.4477 44 16 43.5523 16 43V39Z" 
        fill="#A65124" 
        stroke={color} 
        strokeWidth="1" 
      />
      
      {/* Cheese */}
      <path 
        d="M15 44H49V46C49 46.5523 48.5523 47 48 47H16C15.4477 47 15 46.5523 15 46V44Z" 
        fill="#FFC107" 
        stroke={color} 
        strokeWidth="1" 
      />
      
      {/* Bottom Bun */}
      <path 
        d="M17 47H47C48.6569 47 50 48.3431 50 50V52C50 53.6569 48.6569 55 47 55H17C15.3431 55 14 53.6569 14 52V50C14 48.3431 15.3431 47 17 47Z" 
        fill="#E8853D" 
        stroke={color} 
        strokeWidth="2" 
      />
    </svg>
  );
};

export default BurgerChefIcon;
