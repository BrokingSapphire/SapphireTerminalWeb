"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

function TradeSelector() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const tabs = [
    { name: "Equity", path: "/holdings/equity" },
    { name: "Mutual Funds", path: "/holdings/mutualfunds" },
  ];

  // Find the active tab
  const activeTab = tabs.find((tab) => tab.path === pathname) || tabs[0];

  // Toggle dropdown menu for mobile
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      {/* Desktop Version - Horizontal Tabs */}
      <div className="hidden mb-7 border-b-2 border-gray-200 dark:border-[#2f2f2f] md:flex w-full justify-center items-center gap-x-14">
        {tabs.map((tab) => {
          const isActive = tab.path === pathname;
          return (
            <div
              key={tab.name}
              className="relative group h-[44px] flex items-center"
            >
              <Link
                href={tab.path}
                className={`relative group font-medium py-2 px-5 rounded-lg transition-all duration-300
                  ${isActive ? "dark:text-white dark:bg-[#2F2F2F] text-black bg-[#F4F4F9] shadow-md" : "dark:text-white text-gray-600 xsm:text-[#444] bg-transparent hover:bg-[#ededed] dark:hover:bg-[#232323] xsm:group-hover:text-[#2F2F2F] dark:xsm:group-hover:text-white"}
                  group-hover:shadow-lg`}
                style={{ fontSize: "15px", letterSpacing: '0.01em' }}
              >
                {tab.name}
                {/* Modern underline/indicator */}
                <span
                  className={`absolute left-1/2 -bottom-1.5 -translate-x-1/2 h-[3px] rounded-full bg-[#2F2F2F] transition-all duration-300
                    ${isActive ? "w-8 opacity-100" : "w-0 opacity-0"} group-hover:w-8 group-hover:opacity-60`}
                ></span>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Mobile Version - Dropdown */}
      <div className="md:hidden w-full px-4 mt-5 md:mt-0">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className={`w-full px-4 py-2 font-medium flex items-center justify-between rounded-lg border transition-all duration-300 shadow-sm
              ${pathname === activeTab.path ? "text-white bg-[#2F2F2F] border-[#2F2F2F]" : "text-gray-700 border-gray-300 bg-white dark:bg-[#232323]"}
              hover:bg-[#ededed] dark:hover:bg-[#232323]`}
            style={{ fontSize: "15px" }}
          >
            <span>{activeTab.name}</span>
            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute mt-1 w-full rounded-lg shadow-lg bg-white dark:bg-[#232323] border border-gray-200 dark:border-[#2f2f2f] z-20">
              {tabs.map((tab) => {
                const isActive = pathname === tab.path;
                return (
                  <Link
                    key={tab.name}
                    href={tab.path}
                    onClick={() => setIsDropdownOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-colors duration-200 text-[15px] ${
                      isActive
                        ? "dark:text-white dark:bg-[#2F2F2F] text-black bg-[#F4F4F9]"
                        : "text-gray-700 dark:text-white hover:text-[#2F2F2F] hover:bg-[#ededed] dark:hover:bg-[#232323]"
                    }`}
                  >
                    {tab.name}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TradeSelector;
