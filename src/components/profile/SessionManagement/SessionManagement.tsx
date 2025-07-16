import React, { useState } from 'react';

// Add Inter font import (add this to your global CSS or layout)
//  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

interface FundTransferOption {
  id: string;
  label: string;
  description: string;
  selected: boolean;
}

const FundTransferComponent: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('90days');
  
  const options: FundTransferOption[] = [
    {
      id: '90days',
      label: '90 days',
      description: 'Unused funds will be transferred to your bank account on the first Friday of every quarter',
      selected: selectedOption === '90days'
    },
    {
      id: '30days',
      label: '30 days',
      description: 'Unused funds will be transferred to your bank account on the first Friday of every quarter',
      selected: selectedOption === '30days'
    },
    {
      id: 'bill-to-bill',
      label: 'Bill to Bill Settlement',
      description: 'Unused funds will be transferred to your bank account on the first Friday of every quarter',
      selected: selectedOption === 'bill-to-bill'
    }
  ];

  const handleOptionChange = (optionId: string) => {
    setSelectedOption(optionId);
  };

  return (
    <div className="w-full max-w-6xl mx-auto min-h-[300px] sm:min-h-[350px] bg-white dark:bg-[#121212] border border-gray-300 dark:border-[#2F2F2F] rounded-lg p-3 sm:p-4 lg:p-6 flex flex-col gap-4 sm:gap-5 lg:gap-6 relative font-inter">
      {/* Header */}
      <div className="text-gray-800 dark:text-[#EBEEF5] text-xs sm:text-sm lg:text-base font-normal leading-relaxed sm:leading-none tracking-normal font-inter">
        Funds available in your Sapphire account will be transferred to your registered bank account Based on the selection made below
      </div>
      
      {/* Options Container */}
      <div className="w-full border border-[#D1D5DB] dark:border-[#2F2F2F] bg-white dark:bg-[#121212] rounded-lg shadow-[0px_2px_4px_0px_#00000014,0px_0px_8px_0px_#00000005] dark:shadow-[0px_2px_4px_0px_#00000040,0px_0px_8px_0px_#00000020] flex flex-col">
        {options.map((option, index) => (
          <div
            key={option.id}
            className={`min-h-[60px] sm:min-h-[64px] lg:h-16 flex items-center justify-between py-3 sm:py-3 lg:py-3 px-3 sm:px-4 lg:px-4 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors ${
              index !== options.length - 1 ? 'border-b-[0.5px] border-[#D1D5DB] dark:border-[#2F2F2F]' : ''
            }`}
          >
            <div className="flex items-start sm:items-center gap-3 w-full">
              {/* Radio Button */}
              <div className="relative flex-shrink-0 mt-1 sm:mt-0">
                <input
                  type="radio"
                  id={option.id}
                  name="fund-transfer"
                  checked={option.selected}
                  onChange={() => handleOptionChange(option.id)}
                  className="sr-only"
                />
                <div 
                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors ${
                    option.selected 
                      ? 'border-green-500 bg-white dark:bg-[#121212]' 
                      : 'border-gray-300 dark:border-[#666666] bg-white dark:bg-[#121212]'
                  }`}
                  onClick={() => handleOptionChange(option.id)}
                >
                  {option.selected && (
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500"></div>
                  )}
                </div>
              </div>
              
              {/* Label and Description */}
              <div className="flex flex-col flex-1 min-w-0">
                <label 
                  htmlFor={option.id}
                  className="text-gray-900 dark:text-[#EBEEF5] font-medium text-sm sm:text-sm lg:text-base cursor-pointer"
                >
                  {option.label}
                </label>
                <span className="text-gray-600 dark:text-[#C9CACC] text-xs sm:text-xs lg:text-sm mt-1 leading-relaxed sm:leading-normal break-words">
                  {option.description}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Proceed Button */}
      <div className="flex justify-center sm:justify-end w-full">
        <button className="w-full sm:w-auto bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white font-medium py-2.5 sm:py-2 px-6 sm:px-6 lg:px-8 rounded-md transition-colors duration-200 font-inter text-sm sm:text-sm lg:text-base">
          Proceed
        </button>
      </div>
    </div>
  );
};

export default FundTransferComponent;