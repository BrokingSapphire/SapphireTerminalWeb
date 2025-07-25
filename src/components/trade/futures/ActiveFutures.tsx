"use client";

import React, { useState, useEffect } from "react";
import TradeCard from "../stocks/TradeCard";
import { Search, X } from "lucide-react";
import { HiOutlineAdjustments } from "react-icons/hi";

// Define the Trade interface
interface Trade {
  symbol: string;
  date: string;
  type: string;
  price: number;
  percentChange: number;
  entryPrice: number;
  entryRange: string;
  stoploss: string;
  target: number;
  quantity: number;
  riskRewardRatio: string;
  marginRequired: number;
  netGain?: string;
  postedOn?: string;
  postedBy?: string;
  adviceId?: string;
}

export default function TradesList() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredTrades, setFilteredTrades] = useState<Trade[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<string>("");

  // This is where you would normally fetch your active trades data
  const activeTradesData: Trade[] = [
    {
      symbol: "HINDUUNILVR",
      date: "27 FEB",
      type: "SELL",
      price: 1489.68,
      percentChange: 2.56,
      entryPrice: 4780.9,
      entryRange: "400-410",
      stoploss: "...",
      target: 4880.0,
      quantity: 300,
      riskRewardRatio: "1/2",
      marginRequired: 334099,
      netGain: "3.16% in 2 days",
      postedOn: "31 Jan 2023 12:20:40",
      postedBy: "[name]",
      adviceId: "[ID]",
    },
    {
      symbol: "HINDUUNILVR",
      date: "27 FEB",
      type: "BUY",
      price: 1489.68,
      percentChange: 2.56,
      entryPrice: 4780.9,
      entryRange: "400-410",
      stoploss: "...",
      target: 4880.0,
      quantity: 300,
      riskRewardRatio: "1/2",
      marginRequired: 334099,
    },
    {
      symbol: "HINDUUNILVR",
      date: "27 FEB",
      type: "BUY",
      price: 1489.68,
      percentChange: 2.56,
      entryPrice: 4780.9,
      entryRange: "400-410",
      stoploss: "...",
      target: 4880.0,
      quantity: 300,
      riskRewardRatio: "1/2",
      marginRequired: 334099,
    },
  ];

  // Filter trades based on search query and filter type
  useEffect(() => {
    let filtered = [...activeTradesData];

    // Apply type filter if selected
    if (filterType) {
      filtered = filtered.filter((trade) => trade.type === filterType);
    }

    // Apply search query if entered
    if (searchQuery.trim() !== "") {
      const lowercasedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (trade) =>
          trade.symbol.toLowerCase().includes(lowercasedQuery) ||
          trade.type.toLowerCase().includes(lowercasedQuery) ||
          (trade.postedBy &&
            trade.postedBy.toLowerCase().includes(lowercasedQuery))
      );
    }

    setFilteredTrades(filtered);
  }, [searchQuery, filterType]);

  // Initialize filtered trades with all trades on component mount
  useEffect(() => {
    setFilteredTrades(activeTradesData);
  }, []);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilterType("");
    setShowFilters(false);
  };

  return (
    <div className="w-full max-w-[1100px] mx-auto px-2">
      <div className="flex items-center justify-between flex-wrap gap-2">
        {/* WhatsApp Alerts Button on the left */}
        {/* <Whatsapp /> */}
        <div></div>

        <div className="flex items-center gap-2">
          {/* Filter Button */}
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-5 py-2.5 bg-[#F4F4F9] dark:bg-dark-insidecard rounded-md border dark:border-none h-[42px] ${
                showFilters || filterType 
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "border-[#D1D5DB] text-gray-700"
              }`}
            >
              <HiOutlineAdjustments size={18} className="dark:text-white" />
              <span className="text-xs dark:text-white">Filter</span>
              {filterType && (
                <div className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                  1
                </div>
              )}
            </button>

            {/* Filter Dropdown */}
            {showFilters && (
              <div className="absolute z-10 mt-1 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <div className="px-4 py-2 text-xs font-medium text-gray-700">
                    Trade Type
                  </div>
                  <button
                    className={`w-full px-4 py-2 text-left text-xs ${
                      filterType === "BUY"
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setFilterType("BUY")}
                  >
                    Buy
                  </button>
                  <button
                    className={`w-full px-4 py-2 text-left text-xs ${
                      filterType === "SELL"
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setFilterType("SELL")}
                  >
                    Sell
                  </button>
                  {filterType && (
                    <div className="border-t border-gray-100 px-4 py-2">
                      <button
                        className="text-xs text-red-500 hover:text-red-700"
                        onClick={resetFilters}
                      >
                        Clear Filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Search Feature */}
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search size={14} className="text-[#686868]" />
            </div>
            <input
              type="text"
              placeholder="Search everything..."
              className="w-full pl-3 pr-[70px] py-2.5 border border-[#D1D5DB] dark:border-dark-border dark:bg-[#121212] rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 h-[42px]"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {filterType && (
        <div className="flex items-center bg-blue-50 px-4 py-2 rounded-md">
          <span className="text-xs text-gray-700">Filtered by: </span>
          <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
            {filterType} trades
            <button
              onClick={resetFilters}
              className="ml-1 text-blue-500 hover:text-blue-700"
            >
              <X size={12} />
            </button>
          </span>
        </div>
      )}

      {filteredTrades.length === 0 ? (
        <div className="bg-white p-6 text-center rounded-lg border w-full max-w-[1100px] mx-auto">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No trades found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search parameters.
          </p>
          <div className="mt-3">
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              onClick={() => {
                setSearchQuery("");
                setFilterType("");
              }}
            >
              Clear all filters
            </button>
          </div>
        </div>
      ) : (
        filteredTrades.map((trade, index) => (
          <div key={index} className="w-full max-w-[1100px] mx-auto mb-4 sm:mb-6">
            <TradeCard {...trade} />
          </div>
        ))
      )}
    </div>
  );
}
