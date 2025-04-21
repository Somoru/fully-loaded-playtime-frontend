
import React from "react";

interface NumberBallProps {
  number: number;
  isActive?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

const NumberBall: React.FC<NumberBallProps> = ({ 
  number, 
  isActive = false,
  size = "md" 
}) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-lg",
    lg: "w-16 h-16 text-2xl",
    xl: "w-28 h-28 text-5xl"
  };

  return (
    <div 
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-bold
        ${isActive 
          ? "bg-housie-gold text-housie-darkPurple animate-number-bounce" 
          : "bg-gray-700 text-white"
        }`}
    >
      {number}
    </div>
  );
};

export default NumberBall;
