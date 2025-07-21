'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronDown, HelpCircle, ArrowUpDown, ChevronRight } from 'lucide-react';
import Image from 'next/image';

// Import sample data - replace with API calls in production
import { banks, withdrawHistory, withdrawableBalance } from '@/constants/funds-data';

// Utility functions
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(value);
};

// Define interfaces for type safety
interface WithdrawPageProps {
  onBack: () => void;
}

interface WithdrawalRecord {
  account: string;
  bank: string;
  date: string;
  time: string;
  amount: number;
  status: 'pending' | 'success' | 'failed';
}

// Main Withdraw Page Component
const WithdrawPage: React.FC<WithdrawPageProps> = ({ onBack }) => {
  // State management
  const [withdrawAmount, setWithdrawAmount] = useState<number | null>(null);
  const [selectedBank, setSelectedBank] = useState(banks[0]?.id || '');
  const [history, setHistory] = useState<WithdrawalRecord[]>(withdrawHistory as WithdrawalRecord[]);
  const [availableBalance, setAvailableBalance] = useState(withdrawableBalance);
  const [withdrawType, setWithdrawType] = useState('normal');
  const [withdrawAll, setWithdrawAll] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Add extra banks for dropdown
  const bankOptions = [
    { id: 'bob', label: 'BOB - ******* 8829' },
    { id: 'hdfc', label: 'HDFC - ******* 1234' },
    { id: 'icici', label: 'ICICI - ******* 5678' },
  ];
  const [showBankDropdown, setShowBankDropdown] = useState(false);

  // Check for mobile breakpoint
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 550);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Dark mode detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Handle amount input change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    const numericValue = inputValue ? parseInt(inputValue) : null;
    setWithdrawAmount(numericValue);
  };

  // Effect to set withdraw all amount
  useEffect(() => {
    if (withdrawAll) {
      setWithdrawAmount(availableBalance);
    }
  }, [withdrawAll, availableBalance]);

  // Handle form submission
  const handleSubmit = () => {
    if (withdrawAmount && withdrawAmount > availableBalance) {
      alert('Withdrawal amount exceeds available balance');
      return;
    }
    alert(`Withdrawing ₹${withdrawAmount?.toLocaleString()} to ${selectedBank}`);
  };

  // Handle sorting
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sort data
  const sortedHistory = React.useMemo(() => {
    let sortableItems = [...history];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key as keyof WithdrawalRecord] < b[sortConfig.key as keyof WithdrawalRecord]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key as keyof WithdrawalRecord] > b[sortConfig.key as keyof WithdrawalRecord]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [history, sortConfig]);

  // Calculate pagination
  const totalPages = Math.ceil(sortedHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sortedHistory.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div 
      className={`w-full mx-auto text-xs overflow-y-auto hide-scrollbar min-h-0 mb-8 ${isDarkMode ? 'bg-[#121212]' : ''}`} 
      style={{
        maxHeight: '100vh',
        minWidth: isMobile ? '100%' : '600px',
        padding: isMobile ? '0 16px' : '0'
      }}
    >
      {/* Back button */}
      <button 
        onClick={onBack} 
        className={`flex items-center mb-1 whitespace-nowrap py-0.5 px-1 pb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}
        style={{
          fontSize: isMobile ? '14px' : '16px'
        }}
      >
        <ChevronLeft size={isMobile ? 18 : 20} className="mr-0.5" />
        <span style={{ fontSize: isMobile ? '14px' : '16px' }}>Withdraw</span>
      </button>
      
      {/* Withdraw Form */}
      <div 
        className={`my-2 border rounded-md mx-auto p-2 text-xs ${isDarkMode ? 'bg-[#1e1e1e] border-gray-600' : 'bg-[#FAFAFA] border-gray-200'}`}
        style={{
          width: isMobile ? '100%' : '508px'
        }}
      >
        <div className="p-1.5">
          {/* Title and Balance */}
          <div className="flex justify-between items-center mb-2 text-xs">
            <h2 
              className={`font-medium ${isDarkMode ? 'text-white' : 'text-[#212529]'}`}
              style={{ fontSize: isMobile ? '11px' : '12px' }}
            >
              Enter Amount
            </h2>
            <div 
              className={`${isDarkMode ? 'text-gray-300' : 'text-[#6B7280]'}`}
              style={{ fontSize: isMobile ? '10px' : '12px' }}
            >
              Wdl. Balance : <span className={isDarkMode ? 'text-white' : 'text-[#333333]'}>₹{formatCurrency(availableBalance)}</span>
            </div>
          </div>
          
          {/* Amount Input */}
          <input 
            type="text" 
            placeholder="₹20,000"
            className={`w-full border rounded-md px-2 py-2 mb-1.5 ${isDarkMode ? 'bg-[#2a2a2a] border-gray-600 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-black'}`}
            style={{
              height: isMobile ? '32px' : '38px',
              fontSize: isMobile ? '11px' : '12px'
            }}
            value={withdrawAmount !== null ? `₹${withdrawAmount}` : ''}
            onChange={handleAmountChange}
          />
          <div 
            className={`mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
            style={{ fontSize: isMobile ? '9px' : '12px' }}
          >
            Amount is Expected to credit by (next settlement cycle)
          </div>
          
          {/* Withdrawal Type Selection */}
          <div 
            className={`flex items-center mb-3 ${isMobile ? 'flex-col items-start gap-2' : 'flex-row'}`}
            style={{ fontSize: isMobile ? '10px' : '12px' }}
          >
            <label className="inline-flex items-center mr-4">
              <input 
                type="radio" 
                name="withdrawType" 
                checked={withdrawType === 'instant'} 
                onChange={() => setWithdrawType('instant')} 
                className="mr-1.5 h-4 w-4"
              />
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Instant Withdraw</span>
            </label>
            <label className="inline-flex items-center">
              <input 
                type="radio" 
                name="withdrawType" 
                checked={withdrawType === 'normal'} 
                onChange={() => setWithdrawType('normal')} 
                className="mr-1.5 h-4 w-4"
              />
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Normal Withdraw</span>
            </label>
          </div>
          
          {/* Bank Selection */}
          <h2 
            className={`font-medium mb-1.5 mt-2 ${isDarkMode ? 'text-white' : 'text-black'}`}
            style={{ fontSize: isMobile ? '11px' : '12px' }}
          >
            Select Bank
          </h2>
          <div className="relative mb-[12px]">
            <div
              className={`flex items-center justify-between w-full border rounded-md px-2 py-1.5 cursor-pointer ${isDarkMode ? 'bg-[#2a2a2a] border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
              style={{
                height: isMobile ? '32px' : '38px',
                fontSize: isMobile ? '11px' : '12px'
              }}
              onClick={() => setShowBankDropdown((v) => !v)}
            >
              <div className="flex items-center">
                <Image
                  alt="Bank"
                  src="/funds/bank-transfer.svg"
                  width={isMobile ? 16 : 20}
                  height={isMobile ? 16 : 20}
                  className="mr-1.5"
                />
                <span>{bankOptions.find((b) => b.id === selectedBank)?.label}</span>
              </div>
              <ChevronDown size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-400'} />
            </div>
            {showBankDropdown && (
              <div className={`absolute left-0 right-0 mt-1 border rounded-md shadow-lg z-10 ${isDarkMode ? 'bg-[#2a2a2a] border-gray-600' : 'bg-white border-gray-200'}`}>
                {bankOptions.map((bank) => (
                  <div
                    key={bank.id}
                    className={`flex items-center px-3 py-2 cursor-pointer ${isDarkMode ? 'hover:bg-[#3a3a3a] text-white' : 'hover:bg-gray-100 text-black'} ${selectedBank === bank.id ? (isDarkMode ? 'bg-[#3a3a3a]' : 'bg-gray-50') : ''}`}
                    onClick={() => {
                      setSelectedBank(bank.id);
                      setShowBankDropdown(false);
                    }}
                  >
                    <Image
                      alt="Bank"
                      src="/funds/bank-transfer.svg"
                      width={isMobile ? 14 : 18}
                      height={isMobile ? 14 : 18}
                      className="mr-2"
                    />
                    <span style={{ fontSize: isMobile ? '10px' : '12px' }}>{bank.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Withdraw All Checkbox */}
          <label className="inline-flex items-center mb-4">
            <input 
              type="checkbox" 
              checked={withdrawAll} 
              onChange={() => setWithdrawAll(!withdrawAll)} 
              className="mr-1.5 h-4 w-4"
            />
            <span 
              className={`${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}
              style={{ fontSize: isMobile ? '10px' : '12px' }}
            >
              Withdraw all
            </span>
          </label>
          
          {/* Submit Button */}
          <button 
            className="w-full bg-green-500 text-white font-medium rounded-md text-center mt-3 hover:bg-green-600 transition-colors"
            style={{
              height: isMobile ? '32px' : '38px',
              fontSize: isMobile ? '11px' : '12px'
            }}
            onClick={handleSubmit}
          >
            Withdraw {withdrawAmount ? `₹${formatCurrency(withdrawAmount)}` : 'Amount'}
          </button>
        </div>
      </div>
      
      {/* Horizontal Divider */}
      <hr className={`my-4 ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`} />
      
      {/* Withdrawal History */}
      <div>
        {/* Pagination */}
        <div className="flex items-center justify-between mt-3 hidden">
          <div 
            className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
            style={{ fontSize: isMobile ? '10px' : '12px' }}
          >
            Showing {startIndex + 1} to {Math.min(endIndex, sortedHistory.length)} of {sortedHistory.length} entries
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-1.5 border rounded disabled:opacity-50 disabled:cursor-not-allowed ${isDarkMode ? 'border-gray-600 hover:bg-[#2a2a2a] text-white' : 'border-gray-300 hover:bg-gray-50 text-black'}`}
            >
              <ChevronLeft size={14} />
            </button>

            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-2 py-1.5 border rounded ${
                  currentPage === page
                    ? "bg-blue-500 text-white border-blue-500"
                    : isDarkMode 
                      ? "border-gray-600 hover:bg-[#2a2a2a] text-white"
                      : "border-gray-300 hover:bg-gray-50 text-black"
                }`}
                style={{ fontSize: isMobile ? '10px' : '12px' }}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-1.5 border rounded disabled:opacity-50 disabled:cursor-not-allowed ${isDarkMode ? 'border-gray-600 hover:bg-[#2a2a2a] text-white' : 'border-gray-300 hover:bg-gray-50 text-black'}`}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawPage;