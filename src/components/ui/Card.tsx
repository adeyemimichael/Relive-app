import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glassmorphism?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  glassmorphism = false
}) => {
  const baseStyles = 'rounded-lg overflow-hidden';
  
  const hoverStyles = hover 
    ? 'transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg' 
    : '';
  
  const cardStyles = glassmorphism 
    ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/30 dark:border-slate-700/50 shadow-md' 
    : 'bg-white dark:bg-slate-900 shadow border border-slate-200 dark:border-slate-700';
  
  return (
    <div className={`${baseStyles} ${cardStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};

export default Card;