import React from 'react';
import { ArrowUpDown, MoreVertical } from 'lucide-react';

const FixedColumnTable = ({ filteredTrades }: any) => {
  return (
    <>
      {/* Desktop: fixed columns */}
      <div className="hidden md:flex w-full overflow-hidden border rounded-lg dark:border-[#2F2F2F]">
        {/* Fixed columns */}
        <div className="sticky left-0 z-10">
          <table className="border-collapse">
            <thead>
              <tr className="h-[54px]">
                <th className="px-4 text-left font-medium text-black dark:text-dark-lighttext text-base whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] w-48 bg-[#F4F4F9] dark:bg-dark-insidecard h-[54px] group">
                  <div className="flex items-center justify-between">
                    <span>Date & Time</span>
                    <ArrowUpDown size={16} className="text-gray-500 dark:text-dark-lighttext ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-4 text-left font-medium text-black dark:text-dark-lighttext text-base whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] w-64 bg-[#F4F4F9] dark:bg-dark-insidecard h-[54px] group">
                  <div className="flex items-center justify-between">
                    <span>Security</span>
                    <ArrowUpDown size={16} className="text-gray-500 dark:text-dark-lighttext ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTrades.map((trade: any, index: number) => (
                <tr
                  key={`fixed-${index}`}
                  className={`border-t border-gray-200 dark:border-[#2F2F2F] ${index === filteredTrades.length - 1 ? '' : 'border-b'} bg-[#FAFAFA] dark:bg-dark-cardbg h-[50px]`}
                >
                  <td className="px-4 whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] text-sm text-[#6B7280] dark:text-dark-graytext h-[50px]">
                    <div className="text-sm font-medium">{trade.date} <span className="font-normal">{trade.time}</span></div>
                  </td>
                  <td className="px-4 whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] text-sm text-[#6B7280] dark:text-dark-graytext h-[50px]">
                    <div className="flex items-center justify-between">
                      <span>{trade.security}</span>
                      <span className={`ml-2 rounded-sm px-2 py-[2px] text-[11px]  ${
                        trade.type === 'BUY' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-[#FFE4DD] text-[#F10930] dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {trade.type}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Scrollable columns */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="border-collapse">
            <thead>
              <tr className="bg-[#F4F4F9] dark:bg-dark-insidecard h-[54px]">
                <th className="px-4 text-left font-medium text-black dark:text-dark-lighttext text-base whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] w-40 h-[54px] group">
                  <div className="flex items-center justify-between">
                    <span>Entry Price</span>
                    <ArrowUpDown size={16} className="text-gray-500 dark:text-dark-lighttext ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-4 text-left font-medium text-black dark:text-dark-lighttext text-base whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] w-40 h-[54px] group">
                  <div className="flex items-center justify-between">
                    <span>Exit Price</span>
                    <ArrowUpDown size={16} className="text-gray-500 dark:text-dark-lighttext ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-4 text-left font-medium text-black dark:text-dark-lighttext text-base whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] w-40 h-[54px] group">
                  <div className="flex items-center justify-between">
                    <span>Quantity</span>
                    <ArrowUpDown size={16} className="text-gray-500 dark:text-dark-lighttext ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-4 text-left font-medium text-black dark:text-dark-lighttext text-base whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] w-40 h-[54px] group">
                  <div className="flex items-center justify-between">
                    <span>Duration</span>
                    <ArrowUpDown size={16} className="text-gray-500 dark:text-dark-lighttext ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-4 text-left font-medium text-black dark:text-dark-lighttext text-base whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] w-40 h-[54px] group">
                  <div className="flex items-center justify-between">
                    <span>Net G/L</span>
                    <ArrowUpDown size={16} className="text-gray-500 dark:text-dark-lighttext ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-4 text-left font-medium text-black dark:text-dark-lighttext text-base whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] w-40 h-[54px] group">
                  <div className="flex items-center justify-between">
                    <span>Margin</span>
                    <ArrowUpDown size={16} className="text-gray-500 dark:text-dark-lighttext ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-4 text-left font-medium text-black dark:text-dark-lighttext text-base whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] w-40 h-[54px] group">
                  <div className="flex items-center justify-between">
                    <span>Posted by</span>
                    <ArrowUpDown size={16} className="text-gray-500 dark:text-dark-lighttext ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-4 text-left font-medium text-black dark:text-dark-lighttext text-base whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] w-40 h-[54px] group">
                  <div className="flex items-center justify-between">
                    <span>Status</span>
                    <ArrowUpDown size={16} className="text-gray-500 dark:text-dark-lighttext ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTrades.map((trade: any, index: number) => (
                <tr
                  key={`scroll-${index}`}
                  className={`border-t border-gray-200 dark:border-[#2F2F2F] hover:bg-[#FAFAFA] dark:hover:bg-[#1E1E1E] ${index === filteredTrades.length - 1 ? '' : 'border-b'} bg-white dark:bg-dark-cardbg h-[50px]`}
                >
                  <td className="px-4 text-center whitespace-nowrap text-sm text-[#6B7280] dark:text-dark-graytext border-r border-gray-200 dark:border-[#2F2F2F] h-[50px]">{trade.entryPrice}</td>
                  <td className="px-4 text-center whitespace-nowrap text-sm text-[#6B7280] dark:text-dark-graytext border-r border-gray-200 dark:border-[#2F2F2F] h-[50px]">{trade.exitPrice}</td>
                  <td className="px-4 text-center whitespace-nowrap text-sm text-[#6B7280] dark:text-dark-graytext border-r border-gray-200 dark:border-[#2F2F2F] h-[50px]">{trade.quantity}</td>
                  <td className="px-4 text-center whitespace-nowrap text-sm text-[#6B7280] dark:text-dark-graytext border-r border-gray-200 dark:border-[#2F2F2F] h-[50px]">{trade.duration}</td>
                  <td className="px-4 text-center whitespace-nowrap text-sm border-r border-gray-200 dark:border-[#2F2F2F] h-[50px]">
                    <div className={`text-sm font-medium ${trade.netGL?.startsWith('-') ? 'text-red-600' : 'text-green-600'}`}>
                      {trade.net || '—'}
                    </div>
                  </td>
                  <td className="px-4 text-center whitespace-nowrap text-sm text-[#6B7280] dark:text-dark-graytext border-r border-gray-200 dark:border-[#2F2F2F] h-[50px]">{trade.marginReq || '—'}</td>
                  <td className="px-4 text-center whitespace-nowrap text-sm text-[#6B7280] dark:text-dark-graytext border-r border-gray-200 dark:border-[#2F2F2F] h-[50px]">{trade.postedBy || '[posted.by]'}</td>
                  <td className="px-4 text-center whitespace-nowrap text-sm border-r border-gray-200 dark:border-[#2F2F2F] h-[50px]">
                    <div className={`inline-block px-2 py-1 text-xs rounded ${
                      trade.status === 'Target Hit' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                      trade.status === 'Stoploss Hit' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' : 
                      trade.status === 'Target Miss' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' : 
                      'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                    }`}>
                      {trade.status || '—'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Mobile: single scrollable table */}
      <div className="md:hidden w-full overflow-x-auto border rounded-lg dark:border-[#2F2F2F] mt-4">
        <table className="border-collapse min-w-[800px] w-full">
          <thead>
            <tr className="h-[54px]">
              <th className="px-4 text-left font-medium text-black dark:text-dark-lighttext text-base whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] bg-[#F4F4F9] dark:bg-dark-insidecard h-[54px] group">Date & Time</th>
              <th className="px-4 text-left font-medium text-black dark:text-dark-lighttext text-base whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] bg-[#F4F4F9] dark:bg-dark-insidecard h-[54px] group">Security</th>
              <th className="px-4 text-left font-medium text-black dark:text-dark-lighttext text-base whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] bg-[#F4F4F9] dark:bg-dark-insidecard h-[54px] group">Type</th>
              <th className="px-4 text-left font-medium text-black dark:text-dark-lighttext text-base whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] bg-[#F4F4F9] dark:bg-dark-insidecard h-[54px] group">Entry Price</th>
              <th className="px-4 text-left font-medium text-black dark:text-dark-lighttext text-base whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] bg-[#F4F4F9] dark:bg-dark-insidecard h-[54px] group">Exit Price</th>
              <th className="px-4 text-left font-medium text-black dark:text-dark-lighttext text-base whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] bg-[#F4F4F9] dark:bg-dark-insidecard h-[54px] group">Quantity</th>
              <th className="px-4 text-left font-medium text-black dark:text-dark-lighttext text-base whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] bg-[#F4F4F9] dark:bg-dark-insidecard h-[54px] group">Duration</th>
              <th className="px-4 text-left font-medium text-black dark:text-dark-lighttext text-base whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] bg-[#F4F4F9] dark:bg-dark-insidecard h-[54px] group">Net G/L</th>
              <th className="px-4 text-left font-medium text-black dark:text-dark-lighttext text-base whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] bg-[#F4F4F9] dark:bg-dark-insidecard h-[54px] group">Margin</th>
              <th className="px-4 text-left font-medium text-black dark:text-dark-lighttext text-base whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] bg-[#F4F4F9] dark:bg-dark-insidecard h-[54px] group">Posted by</th>
              <th className="px-4 text-left font-medium text-black dark:text-dark-lighttext text-base whitespace-nowrap border-r border-gray-200 dark:border-[#2F2F2F] bg-[#F4F4F9] dark:bg-dark-insidecard h-[54px] group">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrades.map((trade: any, index: number) => (
              <tr
                key={`mobile-${index}`}
                className={`border-t border-gray-200 dark:border-[#2F2F2F] bg-white dark:bg-dark-cardbg h-[50px]`}
              >
                <td className="px-4 whitespace-nowrap text-sm text-[#6B7280] dark:text-dark-graytext h-[50px]">{trade.date} {trade.time}</td>
                <td className="px-4 whitespace-nowrap text-sm text-[#6B7280] dark:text-dark-graytext h-[50px]">{trade.security}</td>
                <td className="px-4 whitespace-nowrap text-sm text-[#6B7280] dark:text-dark-graytext h-[50px]">{trade.type}</td>
                <td className="px-4 whitespace-nowrap text-sm text-[#6B7280] dark:text-dark-graytext h-[50px]">{trade.entryPrice}</td>
                <td className="px-4 whitespace-nowrap text-sm text-[#6B7280] dark:text-dark-graytext h-[50px]">{trade.exitPrice}</td>
                <td className="px-4 whitespace-nowrap text-sm text-[#6B7280] dark:text-dark-graytext h-[50px]">{trade.quantity}</td>
                <td className="px-4 whitespace-nowrap text-sm text-[#6B7280] dark:text-dark-graytext h-[50px]">{trade.duration}</td>
                <td className="px-4 whitespace-nowrap text-sm h-[50px]">{trade.net}</td>
                <td className="px-4 whitespace-nowrap text-sm text-[#6B7280] dark:text-dark-graytext h-[50px]">{trade.marginReq || '—'}</td>
                <td className="px-4 whitespace-nowrap text-sm text-[#6B7280] dark:text-dark-graytext h-[50px]">{trade.postedBy || '[posted.by]'}</td>
                <td className="px-4 whitespace-nowrap text-sm h-[50px]">
                  <div className={`inline-block px-2 py-1 text-xs rounded ${
                    trade.status === 'Target Hit' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                    trade.status === 'Stoploss Hit' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' : 
                    trade.status === 'Target Miss' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' : 
                    'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                  }`}>
                    {trade.status || '—'}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FixedColumnTable;