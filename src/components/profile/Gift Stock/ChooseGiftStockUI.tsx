
import React, { useState } from 'react';

const STOCKS = [
  { name: 'BAJAJ-AUTO', haircut: '11.41%', qty: 1397, invested: 1995.55 },
  { name: 'GMRAIRPORT', haircut: '11.41%', qty: 1397, invested: 1995.55 },
  { name: 'RELIANCE', haircut: '11.41%', qty: 1397, invested: 1995.55 },
  { name: 'TATAMOTORS', haircut: '11.41%', qty: 1397, invested: 1995.55 },
  { name: 'HDFCBANK', haircut: '11.41%', qty: 1397, invested: 1995.55 },
];

const ChooseGiftStockUI = () => {
  const [search, setSearch] = useState('');
  const [given, setGiven] = useState<{ [key: string]: boolean }>({});

  const filteredStocks = STOCKS.filter(stock =>
    stock.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleClick = (name: string) => {
    setGiven(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-[#121212]">
      <div className="flex items-center mb-6">
        <div className="relative w-full sm:w-72 sm:ml-auto">
          <input
            type="text"
            placeholder="Search everything..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border border-gray-300 dark:border-[#2F2F2F] rounded px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-400 bg-white dark:bg-[#121413] text-gray-900 dark:text-[#C9CACC] dark:placeholder-[#C9CACC]"
          />
          <span className="absolute left-3 top-2.5 text-gray-400 dark:text-[#C9CACC]">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"/></svg>
          </span>
        </div>
      </div>
      <div className="bg-white dark:bg-[#121413] dark:border dark:border-[#2F2F2F] rounded-xl border border-gray-200 p-2 sm:p-4">
        {filteredStocks.map(stock => (
          <div
            key={stock.name}
            className="flex items-center py-3 sm:py-4 px-2 sm:px-0 border-b border-gray-200 dark:border-[#2F2F2F] last:border-b-0 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition cursor-pointer relative"
            onClick={() => handleClick(stock.name)}
          >
            <input
              type="checkbox"
              checked={!!given[stock.name]}
              readOnly
              className="mr-3 sm:mr-4 w-4 h-4 sm:w-5 sm:h-5 accent-blue-500 dark:bg-[#181A20] dark:border-[#2f2f2f] flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm sm:text-base text-gray-900 dark:text-[#EBEEF5] truncate">{stock.name}</div>
              <div className="text-xs text-gray-500 dark:text-[#C9CACC]">Haircut {stock.haircut}</div>
            </div>
            
            {/* Desktop layout - hidden on mobile */}
            <div className="hidden sm:flex flex-col items-end mr-8">
              <div className="text-xs text-gray-500 dark:text-[#C9CACC]">Qty : <span className="font-semibold text-gray-700 dark:text-[#EBEEF5]">{stock.qty} / {stock.qty}</span></div>
              <div className="text-xs text-gray-500 dark:text-[#C9CACC]">Invested Value :- <span className="font-semibold text-gray-700 dark:text-[#EBEEF5]">₹{stock.invested.toLocaleString(undefined, {minimumFractionDigits:2})}</span></div>
            </div>
            
            {/* Mobile layout - shown only on mobile */}
            <div className="sm:hidden flex flex-col items-end text-right ml-2 flex-shrink-0">
              <div className="text-xs text-gray-500 dark:text-[#C9CACC] mb-1">
                <span className="font-semibold text-gray-700 dark:text-[#EBEEF5]">{stock.qty}</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-[#C9CACC]">
                <span className="font-semibold text-gray-700 dark:text-[#EBEEF5]">₹{stock.invested.toFixed(2)}</span>
              </div>
            </div>
            
            {given[stock.name] && (
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full px-2 sm:px-3 py-1 text-xs font-semibold shadow-lg border-2 border-white dark:border-[#121413]" style={{zIndex:2}}>
                Given
              </span>
            )}
          </div>
        ))}
        {filteredStocks.length === 0 && (
          <div className="text-center text-gray-400 dark:text-[#C9CACC] py-8">No stocks found.</div>
        )}
      </div>
    </div>
  );
};
export default ChooseGiftStockUI;