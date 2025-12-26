// src/components/SkeletonLoader.tsx
"use client";
import React from 'react';

interface SkeletonLoaderProps {
  type: 'card' | 'chart' | 'table-row' | 'text';
  count?: number; // Number of items to render for 'card' or 'table-row'
  className?: string; // Additional Tailwind classes
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type, count = 1, className }) => {
  const renderCardSkeleton = (index: number) => ( // Added index
    <div key={index} className={`bg-gray-200 dark:bg-gray-700 rounded-xl p-5 shadow animate-pulse ${className}`}>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-3"></div>
      <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
    </div>
  );

  const renderChartSkeleton = (index: number) => ( // Added index
    <div key={index} className={`bg-gray-200 dark:bg-gray-700 rounded-xl p-6 shadow h-full flex items-center justify-center animate-pulse ${className}`}>
      <div className="h-48 w-full bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
    </div>
  );

  const renderTableRowSkeleton = (index: number) => ( // Added index
    <tr key={index} className={`bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 animate-pulse ${className}`}>
      <td className="px-5 py-3">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
      </td>
      <td className="px-5 py-3">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
      </td>
      <td className="px-5 py-3">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
      </td>
      <td className="px-5 py-3">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
      </td>
    </tr>
  );

  const renderTextSkeleton = (index: number) => ( // Added index
    <div key={index} className={`bg-gray-200 dark:bg-gray-700 rounded h-4 animate-pulse ${className}`}></div>
  );

  const skeletons = [];
  for (let i = 0; i < count; i++) {
    if (type === 'card') skeletons.push(renderCardSkeleton(i)); // Pass index
    else if (type === 'chart') skeletons.push(renderChartSkeleton(i)); // Pass index
    else if (type === 'table-row') skeletons.push(renderTableRowSkeleton(i)); // Pass index
    else if (type === 'text') skeletons.push(renderTextSkeleton(i)); // Pass index
  }

  return <>{skeletons}</>;
};

export default SkeletonLoader;