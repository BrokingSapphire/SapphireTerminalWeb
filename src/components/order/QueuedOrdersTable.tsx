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
    <div className="w-full flex justify-center">
      <div className="bg-white max-w-[80vw] w-full mx-auto">
        <div className="flex justify-between items-center pt-4 pb-3">
          <h2 className="text-sm font-medium text-gray-800">5 Queued Orders</h2>
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
              className={`pl-9 pr-2 py-2 border border-gray-300 rounded-lg text-sm text-[#686868] focus:outline-none focus:border-blue-500 transition-all duration-200 bg-white ${searchExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              placeholder="Search..."
              style={{ width: searchExpanded ? 192 : 32, minWidth: 0 }}
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-md border border-[#D1D5DB]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#F4F4F9] text-xs text-gray-600 border-b border-[#D1D5DB]" style={{ height: "36px" }}>
                <th className="px-3 py-2 whitespace-nowrap border-r border-[#D1D5DB]">
                  <div className="flex justify-between items-center group">
                    <span className="mr-1 text-xs text-[#1A1A1A] font-[400]">Time</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Image
                        src="/sort-icon.svg"
                        alt="Sort Icon"
                        width={12}
                        height={12}
                      />
                    </div>
                  </div>
                </th>
                <th className="px-3 py-2 whitespace-nowrap border-r border-[#D1D5DB]">
                  <div className="flex justify-between items-center group">
                    <span className="mr-1 text-xs text-[#1A1A1A] font-[400]">Action</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Image
                        src="/sort-icon.svg"
                        alt="Sort Icon"
                        width={12}
                        height={12}
                      />
                    </div>
                  </div>
                </th>
                <th className="px-2 py-2 whitespace-nowrap border-r border-[#D1D5DB]">
                  <div className="flex justify-between items-center group">
                    <span className="mr-1 text-xs text-[#1A1A1A] font-[400]">Exch.</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Image
                        src="/sort-icon.svg"
                        alt="Sort Icon"
                        width={12}
                        height={12}
                      />
                    </div>
                  </div>
                </th>
                <th className="px-3 py-2 whitespace-nowrap border-r border-[#D1D5DB]">
                  <div className="flex justify-between items-center group">
                    <span className="mr-1 text-xs text-[#1A1A1A] font-[400]">Security</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Image
                        src="/sort-icon.svg"
                        alt="Sort Icon"
                        width={12}
                        height={12}
                      />
                    </div>
                  </div>
                </th>
                <th className="px-3 py-2 border-r border-[#D1D5DB]" style={{ width: "80px" }}>
                  <div className="flex justify-between items-center group">
                    <span className="mr-1 text-xs text-[#1A1A1A] font-[400]">Qty.</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Image
                        src="/sort-icon.svg"
                        alt="Sort Icon"
                        width={12}
                        height={12}
                      />
                    </div>
                  </div>
                </th>
                <th className="px-3 py-2 whitespace-nowrap border-r border-[#D1D5DB]">
                  <div className="flex justify-between items-center group">
                    <span className="mr-1 text-xs text-[#1A1A1A] font-[400]">Avg. Price</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Image
                        src="/sort-icon.svg"
                        alt="Sort Icon"
                        width={12}
                        height={12}
                      />
                    </div>
                  </div>
                </th>
                <th className="px-3 py-2 whitespace-nowrap">
                  <div className="flex justify-between items-center group">
                    <span className="mr-1 text-xs text-[#1A1A1A] font-[400]">LTP</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Image
                        src="/sort-icon.svg"
                        alt="Sort Icon"
                        width={12}
                        height={12}
                      />
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className={`border-t border-[#D1D5DB] hover:bg-gray-50 ${
                    index === orders.length - 1
                      ? "rounded-b-md overflow-hidden"
                      : ""
                  }`}
                  style={{ height: "32px" }}
                >
                  <td className="px-3 py-2 text-xs text-[#6B7280] border-r border-[#D1D5DB]">
                    <div className="flex justify-center items-center">
                      <span>{order.time}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-xs text-[#6B7280] border-r border-[#D1D5DB]">
                    <div className="flex justify-center items-center">
                      <span>{order.action}</span>
                    </div>
                  </td>
                  <td className="px-2 py-2 text-xs text-[#6B7280] border-r border-[#D1D5DB]">
                    <div className="flex bg-[#F4F4F9] rounded w-fit px-1.5 py-0.5 mx-auto justify-center items-center">
                      <span>{order.exch}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-xs text-[#6B7280] border-r border-[#D1D5DB]">
                    <div className="flex items-center justify-between">
                      <span>{order.security}</span>
                      <div className="flex items-center">
                        <div
                          className={`px-1.5 py-0.5 text-xs font-normal rounded ${
                            order.type === "BUY"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {order.type}
                        </div>
                        <button className="ml-1.5 text-gray-400 hover:text-gray-600">
                          <Image
                            src="/three-dots.svg"
                            width={14}
                            height={14}
                            alt="Three Dots"
                          />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-xs text-[#6B7280] border-r border-[#D1D5DB]" style={{ width: "80px" }}>
                    <div className="flex justify-center items-center">
                      <span className="text-center break-words">{order.qty}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-xs text-[#6B7280] border-r border-[#D1D5DB]">
                    <div className="flex justify-center items-center">
                      <span>{order.avgPrice}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-xs text-[#6B7280]">
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