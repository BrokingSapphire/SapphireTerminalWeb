"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronDown, ArrowUpDown, ChevronRight } from "lucide-react";
import UpiPaymentModal from "@/components/funds/pop-ups/UpiPaymentModal";
import QrPaymentModal from "@/components/funds/pop-ups/QrPaymentModal";
import BankTransferModal from "@/components/funds/pop-ups/BankTransferModal";

// Import sample data - replace with API calls in production
import {
  depositAmountOptions,
  banks,
  depositHistory,
} from "@/constants/funds-data";
import Image from "next/image";

// Utility functions that can be moved to a separate file
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value);
};

// Define interfaces for type safety
interface DepositPageProps {
  onBack: () => void;
}

// Main Deposit Page Component
const DepositPage: React.FC<DepositPageProps> = ({ onBack }) => {
  // State management
  const [selectedAmount, setSelectedAmount] = useState<number | null>(0);
  const [selectedBank, setSelectedBank] = useState(banks[0]?.id || "");
  const [selectedPaymentMode, setSelectedPaymentMode] = useState("upi");
  const [history, setHistory] = useState(depositHistory);
  const [isMobile, setIsMobile] = useState(false);

  // Modal states
  const [isUpiModalOpen, setIsUpiModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isBankTransferModalOpen, setIsBankTransferModalOpen] = useState(false);

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

  // Handle increment from chips
  const handleAmountIncrement = (amount: number) => {
    setSelectedAmount((prevAmount) => {
      // If no amount is selected, start with 0
      const currentAmount = prevAmount || 0;
      return currentAmount + amount;
    });
  };

  // Handle amount input change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setSelectedAmount(value ? parseInt(value) : null);
  };

  // Handle payment mode selection
  const handlePaymentModeSelect = (mode: string) => {
    setSelectedPaymentMode(mode);
  };

  // Handle payment button click
  const handlePaymentClick = () => {
    if (!selectedAmount) {
      alert("Please enter an amount");
      return;
    }

    // Open the appropriate modal based on the selected payment mode
    if (selectedPaymentMode === "upi") {
      setIsUpiModalOpen(true);
    } else if (selectedPaymentMode === "qr") {
      setIsQrModalOpen(true);
    } else if (
      selectedPaymentMode === "netbanking" ||
      selectedPaymentMode === "transfer"
    ) {
      setIsBankTransferModalOpen(true);
    }
  };

  // Handle successful payment
  const handlePaymentSuccess = () => {
    // Close all modals
    setIsUpiModalOpen(false);
    setIsQrModalOpen(false);
    setIsBankTransferModalOpen(false);

    // In a real implementation, you would update the UI and show a success message
    alert(`Successfully added ₹${selectedAmount?.toLocaleString()}`);

    // Reset form or navigate back
    // onBack(); // Uncomment to navigate back after successful payment
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
        if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
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
      className="w-full mx-auto text-xs overflow-y-auto hide-scrollbar min-h-0 mb-8 bg-white dark:bg-[#121212]" 
      style={{
        maxHeight: '100vh',
        minWidth: isMobile ? '100%' : '600px',
        padding: isMobile ? '0 16px' : '0'
      }}
    >
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center text-black dark:text-[#ebeef5] mb-1 whitespace-nowrap py-0.5 px-1 pb-4"
        style={{
          fontSize: isMobile ? '14px' : '16px'
        }}
      >
        <ChevronLeft size={isMobile ? 18 : 20} className="mr-0.5" />
        <span style={{ fontSize: isMobile ? '14px' : '16px' }}>Deposit</span>
      </button>

      {/* Deposit Form */}
      <div 
        className="bg-[#FAFAFA] dark:bg-[#1c1c1c] border border-gray-200 dark:border-[#2f2f2f] rounded-md mb-3 mx-auto p-3"
        style={{
          width: isMobile ? '100%' : '508px'
        }}
      >
        <div className="p-2">
          {/* Title and Balance */}
          <div className="flex justify-between items-center mb-3">
            <h2 
              className="text-[#212529] dark:text-[#ebeef5]"
              style={{ fontSize: isMobile ? '11px' : '12px' }}
            >
              Enter Amount
            </h2>
            <div 
              className="text-[#6B7280] dark:text-[#c9cacc]"
              style={{ fontSize: isMobile ? '10px' : '12px' }}
            >
              Avl. Balance : <span className="text-[#333333] dark:text-[#ebeef5]">₹1,39,000 </span>
            </div>
          </div>
          
          {/* Amount Input */}
          <input 
            type="text" 
            placeholder="₹20,000"
            className="w-full border border-gray-300 dark:border-[#2f2f2f] text-black dark:text-[#ebeef5] bg-white dark:bg-[#121212] rounded-md px-2 py-2 mb-4 placeholder:text-gray-400 dark:placeholder:text-[#6B7280]"
            style={{
              height: isMobile ? '32px' : '38px',
              fontSize: isMobile ? '11px' : '12px'
            }}
            value={selectedAmount ? `₹${selectedAmount.toLocaleString()}` : ""}
            onChange={handleAmountChange}
          />
          
          {/* Quick Amount Selection */}
          <div 
            className={`flex mb-[18px] ${isMobile ? 'flex-col gap-2' : 'flex-row space-x-2'}`}
          >
            <div className="relative">
              <div
                className="bg-[#F4F4F9] dark:bg-[#2f2f2f] rounded text-[#333333] dark:text-[#ebeef5] px-2 py-1.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#3a3a3a]"
                style={{ fontSize: isMobile ? '10px' : '12px' }}
                onClick={() => handleAmountIncrement(5000)}
              >
                + ₹5,000
              </div>
            </div>
            
            <div className="relative">
              <div className="relative -mt-1">
                {/* Gradient border using pseudo-element */}
                <div
                  className="absolute inset-0 rounded bg-gradient-to-t from-[#34A853] via-[#34A853]/40 to-transparent p-[1px]"
                  style={{ margin: "-1px" }}
                ></div>
                <div
                  className="relative bg-[#F4F4F9] dark:bg-[#2f2f2f] text-[#333333] dark:text-[#ebeef5] rounded px-2 py-1.5 cursor-pointer"
                  style={{ fontSize: isMobile ? '10px' : '12px' }}
                  onClick={() => handleAmountIncrement(10000)}
                >
                  + ₹10,000
                </div>
              </div>
              <span 
                className="absolute text-center w-full text-green-500 mt-0.5"
                style={{ fontSize: isMobile ? '9px' : '12px' }}
              >
                Popular
              </span>
            </div>
            
            <div className="relative">
              <div
                className="bg-[#F4F4F9] dark:bg-[#2f2f2f] text-[#333333] dark:text-[#ebeef5] rounded px-2 py-1.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#3a3a3a]"
                style={{ fontSize: isMobile ? '10px' : '12px' }}
                onClick={() => handleAmountIncrement(20000)}
              >
                + ₹20,000
              </div>
            </div>
          </div>
          
          {/* Bank Selection */}
          <h2 
            className="text-[#212529] dark:text-[#ebeef5] mb-1.5"
            style={{ fontSize: isMobile ? '11px' : '12px' }}
          >
            Select Bank
          </h2>
          <div 
            className="relative mb-4"
            style={{ height: isMobile ? '32px' : '38px' }}
          >
            <div
              className="flex items-center justify-between w-full border border-gray-300 dark:border-[#2f2f2f] rounded-md px-2 py-2 bg-white dark:bg-[#121212] cursor-pointer"
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
                  width={isMobile ? 18 : 22}
                  height={isMobile ? 18 : 22}
                  className="mr-1.5"
                />
                <span className="text-black dark:text-[#ebeef5] ml-1">
                  {bankOptions.find((b) => b.id === selectedBank)?.label}
                </span>
              </div>
              <ChevronDown size={14} className="text-gray-400 dark:text-[#c9cacc]" />
            </div>
            {showBankDropdown && (
              <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2f2f2f] rounded-md shadow-lg z-10">
                {bankOptions.map((bank) => (
                  <div
                    key={bank.id}
                    className={`flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#2f2f2f] ${selectedBank === bank.id ? 'bg-gray-50 dark:bg-[#1c1c1c]' : ''}`}
                    onClick={() => {
                      setSelectedBank(bank.id);
                      setShowBankDropdown(false);
                    }}
                  >
                    <Image
                      alt="Bank"
                      src="/funds/bank-transfer.svg"
                      width={isMobile ? 16 : 18}
                      height={isMobile ? 16 : 18}
                      className="mr-2"
                    />
                    <span 
                      className="text-black dark:text-[#ebeef5]"
                      style={{ fontSize: isMobile ? '10px' : '12px' }}
                    >
                      {bank.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Payment Mode */}
          <h2 
            className="text-[#212529] dark:text-[#ebeef5] mb-1.5"
            style={{ fontSize: isMobile ? '11px' : '12px' }}
          >
            Payment mode:
          </h2>
          <div 
            className={`grid mb-4 ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-3 gap-2'}`}
          >
            <button
              className={`flex items-center justify-center border rounded py-2 px-2 ${
                selectedPaymentMode === "upi"
                  ? "border-green-500 text-green-600"
                  : "border-gray-300 dark:border-[#2f2f2f] text-[#212529] dark:text-[#ebeef5]"
              }`}
              style={{
                height: isMobile ? '32px' : '38px',
                fontSize: isMobile ? '10px' : '12px'
              }}
              onClick={() => handlePaymentModeSelect("upi")}
            >
              <Image
                alt="UPI"
                src="/funds/upi-logo.svg"
                width={isMobile ? 14 : 16}
                height={isMobile ? 14 : 16}
                className="mr-1"
              />
              <span>UPI</span>
            </button>
          
            <button
              className={`flex items-center justify-center border rounded py-2 px-2 ${
                selectedPaymentMode === "qr"
                  ? "border-green-500 text-green-600"
                  : "border-gray-300 dark:border-[#2f2f2f] text-[#212529] dark:text-[#ebeef5]"
              }`}
              style={{
                height: isMobile ? '32px' : '38px',
                fontSize: isMobile ? '10px' : '12px'
              }}
              onClick={() => handlePaymentModeSelect("qr")}
            >
              <Image
                alt="QR"
                src="/funds/qr.svg"
                width={isMobile ? 14 : 16}
                height={isMobile ? 14 : 16}
                className="mr-1"
              />
              <span>Scan QR</span>
            </button>
          
            <button
              className={`flex items-center justify-center border rounded py-2 px-2 ${
                selectedPaymentMode === "netbanking"
                  ? "border-green-500 text-green-600"
                  : "border-gray-300 dark:border-[#2f2f2f] text-[#212529] dark:text-[#ebeef5]"
              }`}
              style={{
                height: isMobile ? '32px' : '38px',
                fontSize: isMobile ? '10px' : '12px'
              }}
              onClick={() => handlePaymentModeSelect("netbanking")}
            >
              <Image
                alt="Net Banking"
                src="/funds/net.svg"
                width={isMobile ? 14 : 16}
                height={isMobile ? 14 : 16}
                className="mr-1"
              />
              <span>Net Banking</span>
            </button>
          </div>
          
          {/* UPI ID Input - Only show when UPI is selected */}
          {selectedPaymentMode === "upi" && (
            <div className="mb-4">
              <h2 
                className="text-[#212529] dark:text-[#ebeef5] mb-1.5"
                style={{ fontSize: isMobile ? '11px' : '12px' }}
              >
                Enter UPI ID
              </h2>
              <input
                type="text"
                placeholder="abcd@ybl"
                className="w-full border border-gray-300 dark:border-[#2f2f2f] rounded-md px-2 py-2 bg-white dark:bg-[#121212] text-black dark:text-[#ebeef5] placeholder:text-gray-400 dark:placeholder:text-[#6B7280]"
                style={{
                  height: isMobile ? '32px' : '38px',
                  fontSize: isMobile ? '11px' : '12px'
                }}
              />
            </div>
          )}
          
          {/* Submit Button */}
          <button 
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium rounded-md text-center mt-[18px] transition-colors duration-200"
            style={{
              height: isMobile ? '32px' : '38px',
              fontSize: isMobile ? '11px' : '12px'
            }}
            onClick={handlePaymentClick}
            disabled={!selectedAmount}
          >
            Add {selectedAmount ? `₹${selectedAmount.toLocaleString()}` : "amount"}
          </button>
        </div>
      </div>

      {/* Horizontal Divider */}
      <hr className="my-4 border-gray-200 dark:border-[#2f2f2f]" />

      {/* Deposit History */}
      <div>
        {/* Pagination */}
        <div className="flex items-center justify-between mt-3 hidden">
          <div 
            className="text-gray-500"
            style={{ fontSize: isMobile ? '10px' : '12px' }}
          >
            Showing {startIndex + 1} to {Math.min(endIndex, sortedHistory.length)} of {sortedHistory.length} entries
          </div>
          
          <div className="flex items-center space-x-1">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={14} />
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-2 py-1.5 border rounded ${
                  currentPage === page
                    ? "bg-blue-500 text-white border-blue-500"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
                style={{ fontSize: isMobile ? '10px' : '12px' }}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modals */}
      <UpiPaymentModal
        isOpen={isUpiModalOpen}
        onClose={() => setIsUpiModalOpen(false)}
        onSuccess={handlePaymentSuccess}
      />

      <QrPaymentModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        onSuccess={handlePaymentSuccess}
      />

      <BankTransferModal
        isOpen={isBankTransferModalOpen}
        onClose={() => setIsBankTransferModalOpen(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default DepositPage;