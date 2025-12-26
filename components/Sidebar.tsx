// src/components/Sidebar.tsx
"use client";
import React from 'react';
import { FaChartPie, FaUsers, FaCog, FaStore, FaTimes } from 'react-icons/fa'; // Added FaTimes

export type DashboardView = 'overview' | 'users' | 'products' | 'settings';

interface SidebarProps {
  activeView: DashboardView;
  onNavigate: (view: DashboardView) => void;
  isOpen: boolean; // NEW: Prop to control mobile sidebar visibility
  onClose: () => void; // NEW: Callback to close mobile sidebar
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate, isOpen, onClose }) => {
  const getLinkClass = (view: DashboardView) => {
    const baseClasses = "flex items-center py-3 px-6 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out rounded-lg mx-2";
    const activeClasses = "bg-primary-100 dark:bg-primary-700 text-primary-700 dark:text-white font-semibold shadow-md dark:shadow-inner-dark transform scale-[1.02]";
    return `${baseClasses} ${activeView === view ? activeClasses : ''}`;
  };

  return (
    <>
      {/* Mobile Overlay (appears when sidebar is open on small screens) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose} // Close sidebar when clicking outside
          aria-hidden="true" // Hide from screen readers
        ></div>
      )}

      {/* Sidebar itself */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 shadow-xl h-screen flex flex-col border-r dark:border-gray-700 z-50
                  transform transition-transform duration-300 ease-in-out
                  ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:flex`} // Responsive visibility
      >
        <div className="p-6 text-2xl font-extrabold text-primary-600 dark:text-primary-400 border-b dark:border-gray-700 flex justify-between items-center">
          ADmyBRAND Dashboard
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="md:hidden text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close sidebar"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
        <nav className="mt-8 flex-grow space-y-2">
          <a
            href="#"
            className={getLinkClass('overview')}
            onClick={() => { onNavigate('overview'); onClose(); }} // Close on navigate
            aria-current={activeView === 'overview' ? 'page' : undefined}
          >
            <FaChartPie className="text-xl mr-3 text-primary-500" /> <span className="font-medium">Dashboard Overview</span>
          </a>
          <a
            href="#"
            className={getLinkClass('users')}
            onClick={() => { onNavigate('users'); onClose(); }} // Close on navigate
            aria-current={activeView === 'users' ? 'page' : undefined}
          >
            <FaUsers className="text-xl mr-3 text-accent-green" /> <span className="font-medium">Users</span>
          </a>
          <a
            href="#"
            className={getLinkClass('products')}
            onClick={() => { onNavigate('products'); onClose(); }} // Close on navigate
            aria-current={activeView === 'products' ? 'page' : undefined}
          >
            <FaStore className="text-xl mr-3 text-accent-purple" /> <span className="font-medium">Products</span>
          </a>
          <a
            href="#"
            className={getLinkClass('settings')}
            onClick={() => { onNavigate('settings'); onClose(); }} // Close on navigate
            aria-current={activeView === 'settings' ? 'page' : undefined}
          >
            <FaCog className="text-xl mr-3 text-accent-red" /> <span className="font-medium">Settings</span>
          </a>
        </nav>
        <div className="p-6 border-t dark:border-gray-700">
          <button className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors duration-200 shadow-md">
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;