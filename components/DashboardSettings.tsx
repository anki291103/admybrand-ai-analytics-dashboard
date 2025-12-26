// src/components/DashboardSettings.tsx
import React from 'react';
import { FaSlidersH } from 'react-icons/fa';

interface DashboardSettingsProps {
  showSalesChart: boolean;
  toggleSalesChart: () => void;
  showUsersChart: boolean;
  toggleUsersChart: () => void;
  // NEW: Props for Category Pie Chart
  showCategoryPieChart: boolean;
  toggleCategoryPieChart: () => void;
}

const DashboardSettings: React.FC<DashboardSettingsProps> = ({
  showSalesChart,
  toggleSalesChart,
  showUsersChart,
  toggleUsersChart,
  showCategoryPieChart, // Destructure new props
  toggleCategoryPieChart, // Destructure new props
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 mb-6 border border-gray-100 dark:border-gray-700"> {/* Added consistent border */}
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
        <FaSlidersH className="mr-2 text-indigo-500" /> Dashboard Settings
      </h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label htmlFor="toggle-sales" className="text-gray-700 dark:text-gray-300 font-medium cursor-pointer">
            Show Sales Chart
          </label>
          <input
            type="checkbox"
            id="toggle-sales"
            checked={showSalesChart}
            onChange={toggleSalesChart}
            className="toggle toggle-primary h-6 w-12 rounded-full appearance-none bg-gray-300 dark:bg-gray-600 transition-colors duration-200 ease-in-out cursor-pointer checked:bg-primary-500 checked:after:translate-x-full checked:after:bg-white" // More explicit Tailwind toggle styling
            // This toggle styling needs a pseudo-element for the thumb.
            // For a quick fix, ensure you have basic global `.toggle` styles or use a component library.
            // A quick tailwind-only toggle might need custom CSS. For now, this class structure implies a custom solution.
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="toggle-users" className="text-gray-700 dark:text-gray-300 font-medium cursor-pointer">
            Show Users by Category Chart
          </label>
          <input
            type="checkbox"
            id="toggle-users"
            checked={showUsersChart}
            onChange={toggleUsersChart}
            className="toggle toggle-primary h-6 w-12 rounded-full appearance-none bg-gray-300 dark:bg-gray-600 transition-colors duration-200 ease-in-out cursor-pointer checked:bg-primary-500 checked:after:translate-x-full checked:after:bg-white"
          />
        </div>
        {/* NEW: Toggle for Category Pie Chart */}
        <div className="flex items-center justify-between">
          <label htmlFor="toggle-pie" className="text-gray-700 dark:text-gray-300 font-medium cursor-pointer">
            Show Sales by Category Chart
          </label>
          <input
            type="checkbox"
            id="toggle-pie"
            checked={showCategoryPieChart}
            onChange={toggleCategoryPieChart}
            className="toggle toggle-primary h-6 w-12 rounded-full appearance-none bg-gray-300 dark:bg-gray-600 transition-colors duration-200 ease-in-out cursor-pointer checked:bg-primary-500 checked:after:translate-x-full checked:after:bg-white"
          />
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Customize your dashboard layout by toggling visibility of key sections.
      </p>
    </div>
  );
};

export default DashboardSettings;