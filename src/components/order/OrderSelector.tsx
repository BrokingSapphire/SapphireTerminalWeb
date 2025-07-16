"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, MoreVertical } from "lucide-react";

function OrderSelector() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [hoveredDropdownItem, setHoveredDropdownItem] = useState<string | null>(null);

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
    <div className="w-full bg-white dark:bg-[#121212]">
      {/* Desktop Version - Horizontal Tabs */}
      <div className="hidden mb-0 border-b-2 border-gray-200 dark:border-[#2F2F2F] md:flex w-full justify-center items-center gap-x-4 lg:gap-x-20 bg-white dark:bg-[#121413]">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;
          const isHovered = hoveredTab === tab.name;
          return (
            <div
              key={tab.name}
              className="relative group h-[40px] flex items-start text-[#1DB954]"
            >
              <Link
                href={tab.path}
                className={`relative group font-medium py-1 pb-0 transition-all duration-300 px-1 group-hover:text-[#1DB954] ${
                  isActive ? 'text-[#1DB954]' : (isHovered ? 'text-[#1DB954]' : 'text-gray-600 dark:text-[#C9CACC]')
                }`}
                style={{ fontSize: "14px" }}
                onMouseEnter={() => setHoveredTab(tab.name)}
                onMouseLeave={() => setHoveredTab(null)}
              >
                {tab.name}
                {/* Green underline animation */}
                <span
                  className={`absolute -bottom-[16px] left-[50%] transform -translate-x-1/2 h-[2px] bg-[#1DB954] transition-all duration-300 ${
                    isActive ? "w-[125%]" : "w-0"
                  } group-hover:w-[125%]`}
                ></span>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Mobile Version - Dropdown */}
      <div className="md:hidden w-full px-4 bg-white dark:bg-[#121413]">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className={`w-full px-4 py-2 font-medium flex items-center justify-between rounded-sm border border-gray-300 dark:border-[#2F2F2F] transition-all duration-300 bg-white dark:bg-[#121413] ${
              pathname === activeTab.path 
                ? 'text-[#1DB954] border-[#1DB954] dark:border-[#1DB954]' 
                : 'text-gray-600 dark:text-[#C9CACC]'
            }`}
            style={{ fontSize: "14px" }}
          >
            <span>{activeTab.name}</span>
            <div className="flex items-center">
              <MoreVertical 
                size={18} 
                className="mr-2 text-gray-400 dark:text-[#C9CACC]"
              />
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 text-gray-400 dark:text-[#C9CACC] ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute mt-1 w-full rounded-md shadow-lg border border-gray-200 dark:border-[#2F2F2F] z-10 bg-white dark:bg-[#121413]">
              {tabs.map((tab) => {
                const isActive = pathname === tab.path;
                const isHovered = hoveredDropdownItem === tab.name;
                return (
                  <Link
                    key={tab.name}
                    href={tab.path}
                    onClick={() => setIsDropdownOpen(false)}
                    className={`block px-4 py-3 transition-colors duration-200 ${
                      isActive 
                        ? 'text-[#1DB954] bg-green-50 dark:bg-[#23232399]' 
                        : isHovered 
                          ? 'text-[#1DB954] bg-gray-50 dark:bg-[#1a1a1a]' 
                          : 'text-gray-600 dark:text-[#C9CACC] hover:text-[#1DB954] hover:bg-gray-50 dark:hover:bg-[#1a1a1a]'
                    }`}
                    style={{ fontSize: "14px" }}
                    onMouseEnter={() => setHoveredDropdownItem(tab.name)}
                    onMouseLeave={() => setHoveredDropdownItem(null)}
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