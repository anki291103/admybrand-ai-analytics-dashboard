// src/components/DetailModal.tsx
"use client";

import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  details: { label: string; value: string | number  }[];
}

const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onClose, title, details }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fade-in"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6 relative
                  transform transition-all duration-300 ease-out scale-100 opacity-100 animate-slide-up
                  border border-gray-100 dark:border-gray-700"> {/* Consistent shadow and border */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors text-xl p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Close modal"
        >
          <FaTimes className="text-xl" />
        </button>

        <h2 id="modal-title" className="text-2xl font-bold mb-4 text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">
          {title}
        </h2>

        <div className="space-y-3">
          {details.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-gray-700 dark:text-gray-300">
              <span className="font-medium">{item.label}:</span>
              <span className="text-right">{item.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          This is detailed information related to your selection. More granular data could be displayed here.
        </div>
      </div>
    </div>
  );
};

export default DetailModal;