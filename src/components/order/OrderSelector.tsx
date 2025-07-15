"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, MoreVertical } from "lucide-react";

function OrderSelector() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const tabs = [
    { name: "Queued", path: "/order/queued" },
    { name: "Executed", path: "/order/executed" },
    { name: "GTT", path: "/order/gtt" },
    { name: "Basket", path: "/order/basket" },
  ];

  // Find the active tab
  const activeTab = tabs.find((tab) => tab.path === pathname) || tabs[0];

  // Toggle dropdown menu for mobile
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-full">
      {/* Desktop Version - Horizontal Tabs */}
      <div className="hidden mb-0 border-b-2 border-gray-200 dark:border-gray-700 md:flex w-full justify-center items-center gap-x-4 lg:gap-x-20 bg-white dark:bg-black">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;
          return (
            <div
              key={tab.name}
              className="relative group h-[40px] flex items-start text-[#1DB954]"
            >
              <Link
                href={tab.path}
                className={`relative group font-medium py-1 pb-0 transition-all duration-300 px-1 ${
                  isActive 
                    ? "text-[#1DB954] dark:text-[#1DB954]" 
                    : "text-gray-600 dark:text-[#C9CACC]"
                } group-hover:text-[#1DB954] dark:group-hover:text-[#1DB954]`}
                style={{ fontSize: "14px" }}
              >
                {tab.name}
                {/* Green underline animation */}
                <span
                  className={`absolute -bottom-[16px] left-[50%] transform -translate-x-1/2 h-[2px] bg-[#1DB954] dark:bg-[#1DB954] transition-all duration-300 ${
                    isActive ? "w-[125%]" : "w-0"
                  } group-hover:w-[125%]`}
                ></span>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Mobile Version - Dropdown */}
      <div className="md:hidden w-full px-4 bg-white dark:bg-black">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className={`w-full px-4 py-2 font-medium flex items-center justify-between rounded-sm border transition-all duration-300 bg-white dark:bg-black ${
              pathname === activeTab.path
                ? "text-[#1DB954] dark:text-[#1DB954] border-[#1DB954] dark:border-[#1DB954]"
                : "text-gray-600 dark:text-[#C9CACC] border-gray-300 dark:border-gray-600"
            }`}
            style={{ fontSize: "14px" }}
          >
            <span>{activeTab.name}</span>
            <div className="flex items-center">
              <MoreVertical 
                size={18} 
                className="text-gray-600 dark:text-[#C9CACC] mr-2" 
              />
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 text-gray-600 dark:text-[#C9CACC] ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute mt-1 w-full rounded-md shadow-lg bg-white dark:bg-black border border-gray-200 dark:border-gray-700 z-10">
              {tabs.map((tab) => {
                const isActive = pathname === tab.path;
                return (
                  <Link
                    key={tab.name}
                    href={tab.path}
                    onClick={() => setIsDropdownOpen(false)}
                    className={`block px-4 py-3 transition-colors duration-200 ${
                      isActive
                        ? "text-[#1DB954] dark:text-[#1DB954] bg-green-50 dark:bg-green-900/20"
                        : "text-gray-600 dark:text-[#C9CACC] hover:text-[#1DB954] dark:hover:text-[#1DB954] hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                    style={{ fontSize: "14px" }}
                  >
                    {tab.name}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderSelector;