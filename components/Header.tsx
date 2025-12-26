"use client";

import React, { useState } from "react";
import {
  FaBell,
  FaSearch,
  FaMoon,
  FaSun,
  FaLightbulb,
  FaBars,
} from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";

interface HeaderProps {
  onSearch: (query: string) => void;
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onSearch,
  onToggleDarkMode,
  isDarkMode,
  onToggleSidebar,
}) => {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    onSearch(searchQuery.trim());
    setSearchQuery("");
  };

  return (
<header className="
  w-full h-16
  bg-white dark:bg-gray-900
  text-gray-900 dark:text-gray-100
  border-b dark:border-gray-700
  px-6
  flex items-center justify-between
">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <FaBars />
        </button>
      </div>

      {/* CENTER SEARCH */}
      <div className="relative flex-1 max-w-xl mx-4">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchQuery.trim()) {
              onSearch(searchQuery.trim());
              setSearchQuery("");
            }
          }}
          placeholder="Ask about sales, users, anomalies..."
          className="w-full pl-12 pr-10 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <FaLightbulb className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
        <button
          onClick={handleSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-500"
        >
          <FaSearch />
        </button>
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-3 relative">
        <button
          onClick={onToggleDarkMode}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>

        <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
          <FaBell />
        </button>

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
            {session?.user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <span className="hidden sm:block text-sm font-medium">
            {session?.user?.name}
          </span>
        </button>

        {open && (
          <div className="absolute right-0 top-12 w-40 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
            <div className="px-4 py-2 text-xs text-gray-500 capitalize">
              {session?.user?.role}
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
