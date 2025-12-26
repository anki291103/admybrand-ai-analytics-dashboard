// src/components/FilterBar.tsx
import React from 'react';

interface FilterBarProps {
  dateRange: string;
  setDateRange: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  dateRange,
  setDateRange,
  category,
  setCategory,
}) => {
  // Your data now ends on 2025-06-29.
  // We'll provide options relevant to this timeframe.
  const availableMonths = [
    { value: "2025-05", label: "May 2025" },
    { value: "2025-06", label: "June 2025" },
    // Add more if you expand your data further into other specific months
  ];


  return (
    <div className="flex flex-wrap gap-4 items-center bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md">
      <label htmlFor="date-range" className="sr-only">Date Range</label>
      <select
        id="date-range"
        value={dateRange}
        onChange={(e) => setDateRange(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                   p-2.5 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm appearance-none pr-8
                   hover:border-indigo-400 transition-colors"
      >
        <option value="all">All Available Data</option> {/* Renamed for clarity */}
        <option value="last7">Last 7 days (of data)</option>
        <option value="last30">Last 30 days (of data)</option>
        <option value="last3months">Last 3 months (of data)</option>
        {/* Dynamic month options based on your data */}
        {availableMonths.map(month => (
          <option key={month.value} value={month.value}>{month.label}</option>
        ))}
      </select>

      <label htmlFor="category-filter" className="sr-only">Category</label>
      <select
        id="category-filter"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                   p-2.5 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm appearance-none pr-8
                   hover:border-indigo-400 transition-colors"
      >
        <option value="all">All Categories</option>
        <option value="Clothing">Clothing</option>
        <option value="Electronics">Electronics</option>
        {/* Ensure these match categories in your salesData */}
      </select>
    </div>
  );
};

export default FilterBar;