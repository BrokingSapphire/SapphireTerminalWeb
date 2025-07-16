"use client";

import React, { useState } from "react";
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
    <div className="w-full max-w-full mx-auto text-xs overflow-y-auto hide-scrollbar min-h-0 mb-8 bg-white dark:bg-[#121212]" style={{maxHeight: '100vh'}}>
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center text-[16px] text-black dark:text-[#ebeef5] mb-1 whitespace-nowrap text-[16px] py-0.5 px-1 pb-4"
      >
        <ChevronLeft size={20} className="mr-0.5" />
        <span className="text-[16px]">Deposit</span>
      </button>

      {/* Deposit Form */}
      <div className="bg-[#FAFAFA] dark:bg-[#1c1c1c] border border-gray-200 dark:border-[#2f2f2f] rounded-md mb-3 max-w-full mx-auto p-3 w-[508px]">
        <div className="p-2">
          {/* Title and Balance */}
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xs text-[#212529] dark:text-[#ebeef5]">Enter Amount</h2>
            <div className="text-[#6B7280] dark:text-[#c9cacc] text-xs">Avl. Balance : <span className="text-[#333333] dark:text-[#ebeef5]">₹1,39,000 </span></div>
          </div>
          
          {/* Amount Input */}
          <input 
            type="text" 
            placeholder="₹20,000"
            className="w-full h-[38px] border border-gray-300 dark:border-[#2f2f2f] text-black dark:text-[#ebeef5] bg-white dark:bg-[#121212] rounded-md px-2 py-2 mb-4 text-xs placeholder:text-gray-400 dark:placeholder:text-[#6B7280]"
            value={selectedAmount ? `₹${selectedAmount.toLocaleString()}` : ""}
            onChange={handleAmountChange}
          />
          
          {/* Quick Amount Selection */}
          <div className="flex space-x-2 mb-[18px]">
            <div className="relative">
              <div
                className="bg-[#F4F4F9] dark:bg-[#2f2f2f] rounded text-[#333333] dark:text-[#ebeef5] px-2 py-1.5 text-xs cursor-pointer hover:bg-gray-50 dark:hover:bg-[#3a3a3a]"
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
                  className="relative bg-[#F4F4F9] dark:bg-[#2f2f2f] text-[#333333] dark:text-[#ebeef5] rounded px-2 py-1.5 text-xs cursor-pointer"
                  onClick={() => handleAmountIncrement(10000)}
                >
                  + ₹10,000
                </div>
              </div>
              <span className="absolute text-xs text-center w-full text-green-500 mt-0.5">
                Popular
              </span>
            </div>
            
            <div className="relative">
              <div
                className="bg-[#F4F4F9] dark:bg-[#2f2f2f] text-[#333333] dark:text-[#ebeef5] rounded px-2 py-1.5 text-xs cursor-pointer hover:bg-gray-50 dark:hover:bg-[#3a3a3a]"
                onClick={() => handleAmountIncrement(20000)}
              >
                + ₹20,000
              </div>
            </div>
          </div>
          
          {/* Bank Selection */}
          <h2 className="text-xs text-[#212529] dark:text-[#ebeef5] mb-1.5">Select Bank</h2>
          <div className="relative mb-4 h-[38px]">
            <div
              className="flex items-center justify-between w-full border h-[38px] border-gray-300 dark:border-[#2f2f2f] rounded-md px-2 py-2 bg-white dark:bg-[#121212] cursor-pointer"
              onClick={() => setShowBankDropdown((v) => !v)}
            >
              <div className="flex items-center">
                <Image
                  alt="Bank"
                  src="/funds/bank-transfer.svg"
                  width={22}
                  height={22}
                  className="mr-1.5"
                />
                <span className="text-black dark:text-[#ebeef5] ml-1 text-xs">
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
                      width={18}
                      height={18}
                      className="mr-2"
                    />
                    <span className="text-xs text-black dark:text-[#ebeef5]">{bank.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Payment Mode */}
          <h2 className="text-xs text-[#212529] dark:text-[#ebeef5] mb-1.5">Payment mode:</h2>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <button
              className={`flex items-center justify-center border rounded py-2 px-2 ${
                selectedPaymentMode === "upi"
                  ? "border-green-500 text-green-600"
                  : "border-gray-300 dark:border-[#2f2f2f] text-[#212529] dark:text-[#ebeef5]"
              }`}
              onClick={() => handlePaymentModeSelect("upi")}
            >
              <Image
                alt="UPI"
                src="/funds/upi-logo.svg"
                width={16}
                height={16}
                className="mr-1"
              />
              <span className="text-xs">UPI</span>
            </button>
          
            <button
              className={`flex items-center justify-center border rounded py-2 px-2 h-[38px] ${
                selectedPaymentMode === "qr"
                  ? "border-green-500 text-green-600"
                  : "border-gray-300 dark:border-[#2f2f2f] text-[#212529] dark:text-[#ebeef5]"
              }`}
              onClick={() => handlePaymentModeSelect("qr")}
            >
              <Image
                alt="QR"
                src="/funds/qr.svg"
                width={16}
                height={16}
                className="mr-1"
              />
              <span className="text-xs">Scan QR</span>
            </button>
          
            <button
              className={`flex items-center justify-center border rounded py-2 px-2 h-[38px] ${
                selectedPaymentMode === "netbanking"
                  ? "border-green-500 text-green-600"
                  : "border-gray-300 dark:border-[#2f2f2f] text-[#212529] dark:text-[#ebeef5]"
              }`}
              onClick={() => handlePaymentModeSelect("netbanking")}
            >
              <Image
                alt="Net Banking"
                src="/funds/net.svg"
                width={16}
                height={16}
                className="mr-1"
              />
              <span className="text-xs">Net Banking</span>
            </button>
          </div>
          
          {/* UPI ID Input - Only show when UPI is selected */}
          {selectedPaymentMode === "upi" && (
            <div className="mb-4">
              <h2 className="text-xs text-[#212529] dark:text-[#ebeef5] mb-1.5">Enter UPI ID</h2>
              <input
                type="text"
                placeholder="abcd@ybl"
                className="w-full border h-[38px] border-gray-300 dark:border-[#2f2f2f] rounded-md px-2 py-2 text-xs bg-white dark:bg-[#121212] text-black dark:text-[#ebeef5] placeholder:text-gray-400 dark:placeholder:text-[#6B7280]"
              />
            </div>
          )}
          
          {/* Submit Button */}
          <button 
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 mt-[18px] h-[38px] rounded-md text-center text-xs transition-colors duration-200"
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
        {/* <h2 className="text-sm font-medium mb-3">Fund Deposit History</h2> */}

        {/* <div className="overflow-x-auto border rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#F4F4F9]">
              <tr>
                <th className="px-2 py-2 text-left text-xs font-medium uppercase tracking-wider border-r group hover:bg-gray-100 cursor-pointer">
                  <div 
                    className="flex items-center justify-between w-full"
                    onClick={() => handleSort('account')}
                  >
                    <span>Account</span>
                    <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-2 py-2 text-left text-xs font-medium uppercase tracking-wider border-r group hover:bg-gray-100 cursor-pointer">
                  <div 
                    className="flex items-center justify-between w-full"
                    onClick={() => handleSort('bank')}
                  >
                    <span>Bank</span>
                    <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-2 py-2 text-left text-xs font-medium uppercase tracking-wider border-r group hover:bg-gray-100 cursor-pointer">
                  <div 
                    className="flex items-center justify-between w-full"
                    onClick={() => handleSort('date')}
                  >
                    <span>Date & Time</span>
                    <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-2 py-2 text-left text-xs font-medium uppercase tracking-wider border-r group hover:bg-gray-100 cursor-pointer">
                  <div 
                    className="flex items-center justify-between w-full"
                    onClick={() => handleSort('amount')}
                  >
                    <span>Amount</span>
                    <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-2 py-2 text-left text-xs font-medium uppercase tracking-wider group hover:bg-gray-100 cursor-pointer">
                  <div 
                    className="flex items-center justify-between w-full"
                    onClick={() => handleSort('status')}
                  >
                    <span>Status</span>
                    <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td className="px-2 py-2 whitespace-nowrap text-xs text-[#6B7280] text-center border-r">
                    {item.account}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs text-[#6B7280] text-center border-r">
                    {item.bank}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs text-[#6B7280] text-center border-r">
                    {item.date} {item.time}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs text-[#6B7280] text-center border-r">
                    ₹{formatCurrency(item.amount)}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-center">
                    <span
                      className={`inline-flex px-1.5 py-0.5 text-xs rounded-sm ${
                        item.status === "pending"
                          ? "bg-[#FFF6DC] text-[#FFBF00]"
                          : item.status === "success"
                          ? "bg-green-100 text-[#1DB954]"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {item.status === "pending"
                        ? "Pending"
                        : item.status === "success"
                        ? "Success"
                        : "Failed"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}

        {/* Pagination */}
        <div className="flex items-center justify-between mt-3 hidden">
          <div className="text-xs text-gray-500">
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
                className={`px-2 py-1.5 border rounded text-xs ${
                  currentPage === page
                    ? "bg-blue-500 text-white border-blue-500"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
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