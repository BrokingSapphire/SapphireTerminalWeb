"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import SearchButton from "@/components/gen-components/SearchButton";

const QueuedOrdersTable = () => {
  // Sample data matching the image
  const [orders, setOrders] = useState([
    {
      time: "12:30:45",
      action: "Intraday",
      exch: "NSE",
      security: "MRF",
      type: "BUY",
      qty: "50/50",
      avgPrice: "2,042.63",
      ltp: "467.80",
    },
    {
      time: "12:30:45",
      action: "Delivery",
      exch: "BSE",
      security: "TATASTEEL",
      type: "SELL",
      qty: "255/265",
      avgPrice: "8223.60",
      ltp: "467.80",
    },
    {
      time: "12:30:45",
      action: "Intraday",
      exch: "BSE",
      security: "ITC",
      type: "BUY",
      qty: "255/265",
      avgPrice: "92,467.00",
      ltp: "467.80",
    },
    {
      time: "12:30:45",
      action: "Intraday",
      exch: "MCX",
      security: "MOTILALOSWL",
      type: "SELL",
      qty: "255/255",
      avgPrice: "88.50",
      ltp: "467.80",
    },
    {
      time: "12:30:45",
      action: "Intraday",
      exch: "NCDEX",
      security: "WIPRO",
      type: "BUY",
      qty: "255/265",
      avgPrice: "324.5",
      ltp: "467.80",
    },
  ]);

  // Expandable search functionality
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="dark:bg-[#121212] w-full xsm:w-[1100px] px-2 xsm:px-0" style={{ margin: '0 auto' }}>
      <div className="bg-white dark:bg-[#121212] w-full xsm:w-[1100px] px-2 xsm:px-0" style={{ margin: '0 auto' }}>
        <div className="flex justify-between items-center pt-6 pb-1 mb-2 mt-1 ml-1 xsm:pt-6 xsm:pb-1 xsm:mb-2 xsm:mt-1 xsm:ml-1 px-2 xsm:px-0">
          <h2 className="text-md font-medium text-gray-900 dark:text-[#EBEEF5]">5 Queued Orders</h2>
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
        <div className="overflow-x-auto w-full" style={{ borderRadius: '8px' }}>
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#121413] text-xs border-b border-gray-200 dark:border-[#2F2F2F]" style={{ height: "36px" }}>
                <th className="px-3 py-2 whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F]">
                  <div className="flex justify-between items-center group">
                    <span className="mr-1 text-xs text-gray-900 dark:text-[#EBEEF5] font-[400]">Time</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Image
                        src="/sort-icon.svg"
                        alt="Sort Icon"
                        width={12}
                        height={12}
                        className="dark:invert"
                      />
                    </div>
                  </div>
                </th>
                <th className="px-3 py-2 whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F]">
                  <div className="flex justify-between items-center group">
                    <span className="mr-1 text-xs text-gray-900 dark:text-[#EBEEF5] font-[400]">Action</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Image
                        src="/sort-icon.svg"
                        alt="Sort Icon"
                        width={12}
                        height={12}
                        className="dark:invert"
                      />
                    </div>
                  </div>
                </th>
                <th className="px-2 py-2 whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F]">
                  <div className="flex justify-between items-center group">
                    <span className="mr-1 text-xs text-gray-900 dark:text-[#EBEEF5] font-[400]">Exch.</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Image
                        src="/sort-icon.svg"
                        alt="Sort Icon"
                        width={12}
                        height={12}
                        className="dark:invert"
                      />
                    </div>
                  </div>
                </th>
                <th className="px-3 py-2 whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F]">
                  <div className="flex justify-between items-center group">
                    <span className="mr-1 text-xs text-gray-900 dark:text-[#EBEEF5] font-[400]">Security</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Image
                        src="/sort-icon.svg"
                        alt="Sort Icon"
                        width={12}
                        height={12}
                        className="dark:invert"
                      />
                    </div>
                  </div>
                </th>
                <th className="px-3 py-2 border-r border-gray-200 dark:border-[#2F2F2F]" style={{ width: "80px" }}>
                  <div className="flex justify-between items-center group">
                    <span className="mr-1 text-xs text-gray-900 dark:text-[#EBEEF5] font-[400]">Qty.</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Image
                        src="/sort-icon.svg"
                        alt="Sort Icon"
                        width={12}
                        height={12}
                        className="dark:invert"
                      />
                    </div>
                  </div>
                </th>
                <th className="px-3 py-2 whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F]">
                  <div className="flex justify-between items-center group">
                    <span className="mr-1 text-xs text-gray-900 dark:text-[#EBEEF5] font-[400]">Avg. Price</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Image
                        src="/sort-icon.svg"
                        alt="Sort Icon"
                        width={12}
                        height={12}
                        className="dark:invert"
                      />
                    </div>
                  </div>
                </th>
                <th className="px-3 py-2 whitespace-nowrap">
                  <div className="flex justify-between items-center group">
                    <span className="mr-1 text-xs text-gray-900 dark:text-[#EBEEF5] font-[400]">LTP</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Image
                        src="/sort-icon.svg"
                        alt="Sort Icon"
                        width={12}
                        height={12}
                        className="dark:invert"
                      />
                    </div>
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
                    <div className="flex justify-center items-center">
                      <span>{order.time}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-700 dark:text-[#C9CACC] border-r border-gray-200 dark:border-[#2F2F2F]">
                    <div className="flex justify-center items-center">
                      <span>{order.action}</span>
                    </div>
                  </td>
                  <td className="px-2 py-2 text-xs text-gray-700 dark:text-[#C9CACC] border-r border-gray-200 dark:border-[#2F2F2F]">
                    <div className="flex bg-gray-100 dark:bg-[#23232399] border border-gray-200 dark:border-[#2F2F2F] rounded w-fit px-1.5 py-0.5 mx-auto justify-center items-center">
                      <span className="text-gray-700 dark:text-white">{order.exch}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-700 dark:text-[#C9CACC] border-r border-gray-200 dark:border-[#2F2F2F]">
                    <div className="flex items-center justify-between">
                      <span>{order.security}</span>
                      <div className="flex items-center">
                        <div
                          className={`px-1.5 py-0.5 text-xs font-normal rounded border ${
                            order.type === "BUY"
                              ? "bg-green-100 dark:bg-[#23232399] text-green-700 dark:text-green-400 border-green-200 dark:border-[#2F2F2F]"
                              : "bg-red-100 dark:bg-[#23232399] text-red-700 dark:text-red-400 border-red-200 dark:border-[#2F2F2F]"
                          }`}
                        >
                          {order.type}
                        </div>
                        <button className="ml-1.5 text-gray-400 dark:text-[#C9CACC] hover:text-gray-600 dark:hover:text-gray-300">
                          <Image
                            src="/three-dots.svg"
                            width={14}
                            height={14}
                            alt="Three Dots"
                            className="dark:invert"
                          />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-700 dark:text-[#C9CACC] border-r border-gray-200 dark:border-[#2F2F2F]" style={{ width: "80px" }}>
                    <div className="flex justify-center items-center">
                      <span className="text-center break-words">{order.qty}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-700 dark:text-[#C9CACC] border-r border-gray-200 dark:border-[#2F2F2F]">
                    <div className="flex justify-center items-center">
                      <span>{order.avgPrice}</span>
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

export default QueuedOrdersTable;