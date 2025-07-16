"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import { DraggableGttOrderFlow } from "./DraggableGttOrderFlow";
import SearchButton from "@/components/gen-components/SearchButton";

const GttOrdersTable = () => {
  // Sample data matching the image
  const [orders, setOrders] = useState([
    {
      date: "24 Jan 2025",
      security: "MRF",
      action: "BUY",
      qty: "50/50",
      triggerPrice: "2,045.63",
      triggerPercentage: "+2.10%",
      isPositive: true,
      ltp: "467.80",
    },
    {
      date: "24 Jan 2025",
      security: "TATASTEEL",
      action: "SELL",
      qty: "265/265",
      triggerPrice: "-2,045.63",
      triggerPercentage: "-2.10%",
      isPositive: false,
      ltp: "467.80",
    },
    {
      date: "24 Jan 2025",
      security: "ITC",
      action: "BUY",
      qty: "265/265",
      triggerPrice: "-2,045.63",
      triggerPercentage: "-2.10%",
      isPositive: false,
      ltp: "467.80",
    },
    {
      date: "24 Jan 2025",
      security: "MOTILALOSWL",
      action: "SELL",
      qty: "265/265",
      triggerPrice: "2,045.63",
      triggerPercentage: "+2.10%",
      isPositive: true,
      ltp: "467.80",
    },
    {
      date: "24 Jan 2025",
      security: "WIPRO",
      action: "BUY",
      qty: "265/265",
      triggerPrice: "-2,045.63",
      triggerPercentage: "-2.10%",
      isPositive: false,
      ltp: "467.80",
    },
  ]);

  // Expandable search functionality
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="w-full flex justify-center bg-white dark:bg-[#121212]">
      <div className="bg-white dark:bg-[#121212] max-w-[80vw] w-full mx-auto">
        <div className="flex justify-between items-center py-3">
          {/* Draggable GTT Order Flow Component */}
          <DraggableGttOrderFlow />
          
          <div
            className={`relative flex items-center transition-all duration-200 overflow-hidden`}
            style={{ width: searchExpanded ? 192 : 32 }}
          >
            <button
              onClick={() => setSearchExpanded(true)}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center z-10"
              aria-label="Expand search"
              tabIndex={searchExpanded ? -1 : 0}
              style={{ pointerEvents: searchExpanded ? 'none' : 'auto' }}
            >
              <SearchButton />
            </button>
            <input
              type="text"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              onBlur={() => setSearchExpanded(false)}
              autoFocus={searchExpanded}
              className={`pl-9 pr-2 py-2 border border-gray-300 dark:border-[#2F2F2F] rounded-lg text-sm text-gray-900 dark:text-[#C9CACC] bg-white dark:bg-[#121413] dark:placeholder-[#C9CACC] focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 ${searchExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              style={{ 
                width: searchExpanded ? 192 : 32, 
                minWidth: 0
              }}
              placeholder="Search..."
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-md border border-gray-200 dark:border-[#2F2F2F]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#121413] text-xs font-medium border-b border-gray-200 dark:border-[#2F2F2F]" style={{ height: "36px" }}>
                <th className="px-3 py-2 whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F]">
                  <div className="flex justify-between items-center">
                    <span className="mr-1 text-xs text-gray-900 dark:text-[#EBEEF5] font-[400]">Date</span>
                    <Image
                      src="/sort-icon.svg"
                      alt="Sort Icon"
                      width={12}
                      height={12}
                      className="dark:invert"
                    />
                  </div>
                </th>
                <th className="px-3 py-2 whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F]">
                  <div className="flex justify-between items-center">
                    <span className="mr-1 text-xs text-gray-900 dark:text-[#EBEEF5] font-[400]">Security</span>
                    <Image
                      src="/sort-icon.svg"
                      alt="Sort Icon"
                      width={12}
                      height={12}
                      className="dark:invert"
                    />
                  </div>
                </th>
                <th className="px-3 py-2 whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F]">
                  <div className="flex justify-between items-center">
                    <span className="mr-1 text-xs text-gray-900 dark:text-[#EBEEF5] font-[400]">Action</span>
                    <Image
                      src="/sort-icon.svg"
                      alt="Sort Icon"
                      width={12}
                      height={12}
                      className="dark:invert"
                    />
                  </div>
                </th>
                <th className="px-3 py-2 whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F]">
                  <div className="flex justify-between items-center">
                    <span className="mr-1 text-xs text-gray-900 dark:text-[#EBEEF5] font-[400]">Qty.</span>
                    <Image
                      src="/sort-icon.svg"
                      alt="Sort Icon"
                      width={12}
                      height={12}
                      className="dark:invert"
                    />
                  </div>
                </th>
                <th className="px-3 py-2 whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F]">
                  <div className="flex justify-between items-center">
                    <span className="mr-1 text-xs text-gray-900 dark:text-[#EBEEF5] font-[400]">Trigger Price</span>
                    <Image
                      src="/sort-icon.svg"
                      alt="Sort Icon"
                      width={12}
                      height={12}
                      className="dark:invert"
                    />
                  </div>
                </th>
                <th className="px-3 py-2 whitespace-nowrap">
                  <div className="flex justify-between items-center">
                    <span className="mr-1 text-xs text-gray-900 dark:text-[#EBEEF5] font-[400]">LTP</span>
                    <Image
                      src="/sort-icon.svg"
                      alt="Sort Icon"
                      width={12}
                      height={12}
                      className="dark:invert"
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-[#121413]">
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className={`border-t border-gray-200 dark:border-[#2F2F2F] hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors ${
                    index === orders.length - 1
                      ? "rounded-b-md overflow-hidden"
                      : ""
                  }`}
                  style={{ height: "32px" }}
                >
                  <td className="px-3 py-2 text-xs text-gray-700 dark:text-[#C9CACC] border-r border-gray-200 dark:border-[#2F2F2F]">
                    <div className="flex items-center">
                      <span>{order.date}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-700 dark:text-[#C9CACC] border-r border-gray-200 dark:border-[#2F2F2F]">
                    <div className="flex items-center justify-between">
                      <span>{order.security}</span>
                      <button className="text-gray-400 dark:text-[#C9CACC] hover:text-gray-600 dark:hover:text-gray-300">
                        <Image
                          src="/three-dots.svg"
                          width={14}
                          height={14}
                          alt="Three Dots"
                          className="dark:invert"
                        />
                      </button>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-700 dark:text-[#C9CACC] border-r border-gray-200 dark:border-[#2F2F2F]">
                    <div className="flex justify-center items-center">
                      <div
                        className={`px-1.5 py-0.5 text-xs font-light rounded border ${
                          order.action === "BUY"
                            ? "bg-green-100 dark:bg-[#23232399] text-green-700 dark:text-green-400 border-green-200 dark:border-[#2F2F2F]"
                            : "bg-red-100 dark:bg-[#23232399] text-red-700 dark:text-red-400 border-red-200 dark:border-[#2F2F2F]"
                        }`}
                      >
                        {order.action}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-700 dark:text-[#C9CACC] border-r border-gray-200 dark:border-[#2F2F2F]">
                    <div className="flex justify-center items-center">
                      <span>{order.qty}</span>
                    </div>
                  </td>
                  <td className="px-3 py-1.5 text-xs border-r border-gray-200 dark:border-[#2F2F2F]">
                    <div className="flex justify-center items-center">
                      <span className={order.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                        {order.triggerPrice}
                      </span>
                      <span className={`ml-1 ${order.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                        {order.triggerPercentage}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-700 dark:text-[#C9CACC]">
                    <div className="flex justify-center items-center">
                      <span>{order.ltp}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GttOrdersTable;