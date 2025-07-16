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
    <div className="p-2 sm:p-3 bg-white dark:bg-[#121212]">
      <div className="flex items-center mb-3">
        <div className="relative w-full sm:w-60 sm:ml-auto">
          <input
            type="text"
            placeholder="Search everything..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border border-gray-300 dark:border-[#2F2F2F] rounded px-3 py-1.5 pl-8 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-400 bg-white dark:bg-[#121413] text-gray-900 dark:text-[#C9CACC] dark:placeholder-[#C9CACC] text-[14px]"
          />
          <span className="absolute left-2 top-2 text-gray-400 dark:text-[#C9CACC]">
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"/></svg>
          </span>
        </div>
      </div>
      <div className="bg-white dark:bg-[#121413] dark:border dark:border-[#2F2F2F] rounded-xl border border-gray-200 p-1 sm:p-2">
        {filteredStocks.map(stock => (
          <div
            key={stock.name}
            className="flex items-center py-2 px-1 border-b border-gray-200 dark:border-[#2F2F2F] last:border-b-0 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition cursor-pointer relative"
            onClick={() => handleClick(stock.name)}
          >
            <input
              type="checkbox"
              checked={!!given[stock.name]}
              readOnly
              className="mr-2 w-4 h-4 accent-blue-500 dark:bg-[#181A20] dark:border-[#2f2f2f] flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-[14px] text-gray-900 dark:text-[#EBEEF5] truncate">{stock.name}</div>
              <div className="text-xs text-gray-500 dark:text-[#C9CACC]">Haircut {stock.haircut}</div>
            </div>
            {/* Desktop layout - hidden on mobile */}
            <div className="hidden sm:flex flex-col items-end mr-4">
              <div className="text-xs text-gray-500 dark:text-[#C9CACC]">Qty : <span className="font-semibold text-gray-700 dark:text-[#EBEEF5]">{stock.qty} / {stock.qty}</span></div>
              <div className="text-xs text-gray-500 dark:text-[#C9CACC]">Invested Value :- <span className="font-semibold text-gray-700 dark:text-[#EBEEF5]"> 9{stock.invested.toLocaleString(undefined, {minimumFractionDigits:2})}</span></div>
            </div>
            {/* Mobile layout - shown only on mobile */}
            <div className="sm:hidden flex flex-col items-end text-right ml-1 flex-shrink-0">
              <div className="text-xs text-gray-500 dark:text-[#C9CACC] mb-0.5">
                <span className="font-semibold text-gray-700 dark:text-[#EBEEF5]">{stock.qty}</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-[#C9CACC]">
                <span className="font-semibold text-gray-700 dark:text-[#EBEEF5]"> b9{stock.invested.toFixed(2)}</span>
              </div>
            </div>
            {given[stock.name] && (
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full px-2 py-0.5 text-xs font-semibold shadow-lg border-2 border-white dark:border-[#121413]" style={{zIndex:2}}>
                Given
              </span>
            )}
          </div>
        ))}
        {filteredStocks.length === 0 && (
          <div className="text-center text-gray-400 dark:text-[#C9CACC] py-4 text-xs">No stocks found.</div>
        )}
      </div>
    </div>
  );
};

export default ChooseGiftStockUI;