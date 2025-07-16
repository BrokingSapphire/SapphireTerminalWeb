import React from 'react';
import { HiOutlineAdjustments } from "react-icons/hi";

interface FilterProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  filterType: 'BUY' | 'SELL' | '';
  setFilterType: (type: 'BUY' | 'SELL' | '') => void;
  filterDuration: string;
  setFilterDuration: (duration: string) => void;
  uniqueDurations: string[];
  resetFilters: () => void;
  getActiveFiltersCount: () => number;
}

const Filter: React.FC<FilterProps> = ({
  showFilters,
  setShowFilters,
  filterType,
  setFilterType,
  filterDuration,
  setFilterDuration,
  uniqueDurations,
  resetFilters,
  getActiveFiltersCount
}) => {
  return (
    <div className="relative w-[100px] flex justify-center">
      <button 
        className={`flex items-center justify-center w-full gap-1 px-4 h-[42px] rounded-sm border transition-colors ${
          getActiveFiltersCount() > 0 
            ? 'bg-blue-50 text-blue-600 border-blue-300 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-600' 
            : 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-[#23232399] dark:text-white dark:border-gray-600'
        }`}
        onClick={() => setShowFilters(!showFilters)}
      >
        <HiOutlineAdjustments size={16} />
        <span className="text-sm">Filter</span>
        {getActiveFiltersCount() > 0 && (
          <div className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white dark:bg-blue-600">
            {getActiveFiltersCount()}
          </div>
        )}
      </button>
             
      {/* Filter Dropdown - Fixed positioning */}
      {showFilters && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 z-20 mt-1 w-64 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-gray-600">
          <div className="py-1">
            <div className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">Trade Type</div>
            <button
              className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                filterType === 'BUY' 
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setFilterType(filterType === 'BUY' ? '' : 'BUY')}
            >
              Buy
            </button>
            <button
              className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                filterType === 'SELL' 
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setFilterType(filterType === 'SELL' ? '' : 'SELL')}
            >
              Sell
            </button>
                         
            <div className="border-t border-gray-100 dark:border-gray-700 mt-2 pt-2">
              <div className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">Duration</div>
              <div className="max-h-48 overflow-y-auto">
                {uniqueDurations.map((duration) => (
                  <button
                    key={duration}
                    className={`w-full px-4 py-2 text-left text-sm truncate transition-colors ${
                      filterDuration === duration 
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setFilterDuration(filterDuration === duration ? '' : duration)}
                  >
                    {duration}
                  </button>
                ))}
              </div>
            </div>
                         
            {getActiveFiltersCount() > 0 && (
              <div className="border-t border-gray-100 dark:border-gray-700 px-4 py-2">
                <button
                  className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                  onClick={resetFilters}
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;