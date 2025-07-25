import React from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

// Modified Trade interface with optional properties
interface Trade {
  security: string;
  type: 'BUY' | 'SELL';
  date: string;
  time: string;
  status?: string; // Optional
  entryPrice: string;
  exitPrice: string;
  quantity: number | string; // Allow both number and string
  net: string;
  postedBy?: string; // Optional
  marginReq?: string; // Optional
  duration?: string; // Added to match your existing data
}

interface GridViewTableProps {
  trades: Trade[]; // Accept an array of trades
}

const GridViewTable: React.FC<GridViewTableProps> = ({ trades }) => {
  return (
    <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-4">
      {trades.map((trade, index) => (
        <div
          key={index}
          className="border border-gray-200 dark:border-[#2F2F2F] bg-[#F4F4F9] dark:bg-dark-cardbg rounded-lg overflow-hidden dark:bg-darkbackground"
        >
          {/* Header with logo, title, buy/sell chip and status label */}
          <div className="p-[18px]">
            <div className="flex items-start justify-between">
              {/* Logo and Title - Restructured to be stacked vertically */}
              <div className="flex flex-col">
                <div className="flex items-center mb-2">
                  {/* Enlarged logo */}
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-md flex items-center justify-center mr-3">
                    <svg
                      className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-normal text-base text-black dark:text-[#EBEEF5]">
                      {trade.security}
                      <span
                        className={`px-1.5 text-xs ml-3 rounded ${
                          trade.type === 'BUY'
                            ? 'bg-[#E5FFDC] text-[#34A853] py-1 px-2 dark:bg-green-900 dark:text-green-300'
                            : 'bg-red-100 text-[#F10930] py-1 px-2 dark:bg-red-900 dark:text-red-300'
                        }`}
                      >
                        {trade.type}
                      </span>
                    </div>
                    {/* Date and time moved below security name */}
                    <div className="flex items-center text-[#6B7280] text-base">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {trade.date} {trade.time}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status section */}
              <div className="flex flex-col items-end">
                <span className="text-[#495057] dark:text-[#C9CACC] text-sm mb-[6px] ">
                  Status
                </span>
                <div className="text-[#FFBF00] bg-[#FFF6DC] rounded p-1 text-[10px] font-medium">
                  {trade.status}
                </div>
              </div>
            </div>
          </div>

          {/* Trade details grid */}
          <div className="flex gap-10 px-6 pb-[18px]">
            <div className="w-1/4">
              <span className="text-sm text-[#495057] dark:text-[#C9CACC]">
                Entry Price
              </span>
              <span className="block text-base font-normal text-black dark:text-[#EBEEF5]">
                {trade.entryPrice}
              </span>
            </div>
            <div className="w-1/4">
              <span className="text-sm text-[#495057] dark:text-[#C9CACC]">
                Exit Price
              </span>
              <span className="block text-base font-normal text-black dark:text-[#EBEEF5]">
                {trade.exitPrice}
              </span>
            </div>
            <div className="w-1/4">
              <span className="text-sm text-[#495057] dark:text-[#C9CACC]">
                Quantity
              </span>
              <span className="block text-base font-normal text-black dark:text-[#EBEEF5]">
                {trade.quantity}
              </span>
            </div>
            <div className="w-1/4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Net G/L
              </span>
              <span className="block text-base font-normal text-black dark:text-[#EBEEF5]">
                {trade.net}
              </span>
            </div>
          </div>

          {/* Posted by section */}
          <div className="px-5 py-2">
            <div className="py-3 px-2 rounded bg-[#EBF5F5] dark:bg-[#1E2928] text-gray-500 dark:text-gray-400 text-sm">
              Posted by:{' '}
              <span className="text-black dark:text-[#EBEEF5]">
                {trade.postedBy || '{Posted.by}'}
              </span>
            </div>
          </div>

          {/* Divider line */}
          <div className="border-t border-gray-200 dark:border-gray-700 mx-3"></div>

          {/* Margin requirement with info icon */}
          <div className="px-6 py-[14px] flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              Margin req :
            </span>
            
            <span className="text-black dark:text-[#EBEEF5] text-sm ml-1">  {trade.marginReq || '₹1,34,099'}</span>
            <Image src='/info.svg' alt="Info" width={16} height={16} className="ml-1 text-gray-400" />
          </div>

          {/* Action button */}
          <div className="px-6 pb-6">
            <button className="flex items-center justify-center w-full p-3 rounded bg-[#00C853] text-white hover:bg-green-500 transition-colors">
              About Trade
              <ArrowRight size={20} className="ml-2" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridViewTable;