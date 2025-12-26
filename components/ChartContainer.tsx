// src/components/ChartContainer.tsx
import React from 'react';

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ title, children }) => (
  <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 flex flex-col border border-gray-100 dark:border-gray-700"> {/* Consistent shadow and border */}
    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">{title}</h3>
    {children}
  </div>
);

export default ChartContainer;