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
    <div className="w-[968px] h-[350px] bg-white border border-gray-300 rounded-lg p-6 flex flex-col gap-6 relative font-inter">
      {/* Header */}
      <div className="text-gray-800 text-sm font-normal leading-none tracking-normal font-inter">
        Funds available in your Sapphire account will be transferred to your registered bank account Based on the selection made below
      </div>
      
      {/* Options Container */}
      <div className="w-[920px] border border-[#D1D5DB] rounded-lg shadow-[0px_2px_4px_0px_#00000014,0px_0px_8px_0px_#00000005] flex flex-col mr-6">
        {options.map((option, index) => (
          <div
            key={option.id}
            className={`h-16 flex items-center justify-between py-3 px-4 ${
              index !== options.length - 1 ? 'border-b-[0.5px] border-[#D1D5DB]' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Radio Button */}
              <div className="relative">
                <input
                  type="radio"
                  id={option.id}
                  name="fund-transfer"
                  checked={option.selected}
                  onChange={() => handleOptionChange(option.id)}
                  className="sr-only"
                />
                <div 
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                    option.selected 
                      ? 'border-green-500 bg-white' 
                      : 'border-gray-300 bg-white'
                  }`}
                  onClick={() => handleOptionChange(option.id)}
                >
                  {option.selected && (
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  )}
                </div>
              </div>
              
              {/* Label and Description */}
              <div className="flex flex-col">
                <label 
                  htmlFor={option.id}
                  className="text-gray-900 font-medium text-sm cursor-pointer"
                >
                  {option.label}
                </label>
                <span className="text-gray-600 text-xs mt-1">
                  {option.description}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Proceed Button Outside the Container */}
      <div className="flex justify-end ">
        <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200 font-inter">
          Proceed
        </button>
      </div>
    </div>
  );
};

export default FundTransferComponent;