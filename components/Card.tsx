// src/components/Card.tsx
import React from 'react';

interface CardProps {
  title: string;
  icon: React.ReactNode;
  value: number | string;
  change: number;
}

const Card: React.FC<CardProps> = ({ title, icon, value, change }) => {
  const isPositive = change >= 0;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-5 flex items-center justify-between
                transform hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer
                border border-gray-100 dark:border-gray-700"> {/* Added subtle border */}
      <div>
        <h3 className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide">{title}</h3>
        <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1 leading-tight">{value}</p>
        <p className={`text-sm mt-1 flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? '▲' : '▼'} {Math.abs(change)}%
        </p>
      </div>
      <div className="text-4xl text-primary-500 dark:text-accent-purple opacity-80
                      bg-gradient-to-br from-primary-400 to-accent-purple-600 text-transparent bg-clip-text
                      dark:from-accent-purple dark:to-primary-600 transition-colors duration-300"> {/* Added gradient to icon */}
        {icon}
      </div>
    </div>
  );
};

export default Card;