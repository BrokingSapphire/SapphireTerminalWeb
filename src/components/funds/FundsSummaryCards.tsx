// components/FundsSummaryCards.tsx
import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import ActionButtons from "./ActionButtons";
import TransactionStatusBadge from "../gen-components/TransactionStatusBadge";
import Image from "next/image";

interface FundsSummaryCardsProps {
  data: {
    availableMargin: number;
    cashBalance: number;
    marginFromPledge: number;
  };
  onNavigate: (section: "main" | "deposit" | "withdraw") => void;
}

const FundsSummaryCards: React.FC<FundsSummaryCardsProps> = ({ data, onNavigate }) => {
  const [isRotating, setIsRotating] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(value);
  };

  const handleRefreshClick = () => {
    if (isRotating) return; // Prevent multiple clicks during animation
    
    setIsRotating(true);
    
    // Reset the rotation state after animation completes
    setTimeout(() => {
      setIsRotating(false);
    }, 600); // Match this with the CSS animation duration
    
    // Add your refresh logic here
    // For example: refetch data, update state, etc.
  };

  return (
    <div style={{
      position: 'relative',
      borderRadius: '8px',
      padding: '1px',
      width: '100%',
      maxWidth: '80vw',
      margin: '0 auto',
      fontSize: '0.875rem' // text-sm
    }}>
      {/* Dashed border using pseudo-element */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: '8px',
        border: 'none',
        background: 'transparent',
        backgroundImage: `
          linear-gradient(90deg, #2f2f2f 16px, transparent 4px, transparent 20px),
          linear-gradient(270deg, #2f2f2f 16px, transparent 4px, transparent 20px),
          linear-gradient(180deg, #2f2f2f 16px, transparent 4px, transparent 20px),
          linear-gradient(0deg, #2f2f2f 16px, transparent 4px, transparent 20px)
        `,
        backgroundSize: '20px 1px, 20px 1px, 1px 20px, 1px 20px',
        backgroundPosition: '0 0, 0 100%, 0 0, 100% 0',
        backgroundRepeat: 'repeat-x, repeat-x, repeat-y, repeat-y',
        pointerEvents: 'none'  // Allow clicks to pass through to content
      }} />
      
      {/* Content */}
      <div className="bg-[#F4F4F9] dark:bg-[#1c1c1c] rounded-lg p-3 sm:p-4 lg:p-[18px] max-w-[95vw] sm:max-w-[90vw] lg:max-w-[80vw] mx-auto text-xs">
        <div className="flex flex-col sm:flex-row lg:flex-row items-start sm:items-center lg:items-center justify-between gap-3 sm:gap-4 lg:gap-0 whitespace-nowrap">
          <div className="flex flex-col w-full sm:w-auto">
            <div className="text-[#6B7080] text-sm sm:text-base lg:text-base dark:text-[#c9cacc]">
              Trading Balance (Cash + Collateral)
            </div>
            <div className="flex items-center mt-1">
              <span className="text-base sm:text-lg lg:text-[18px] font-medium dark:text-[#dee1e8]">₹49,561.80</span>
              <img
                src="/RefreshIcon.svg"
                alt="Refresh"
                width={16}
                height={16}
                className={`ml-2 text-gray-500 cursor-pointer ${isRotating ? 'animate-spin-once' : ''}`}
                onClick={handleRefreshClick}
                style={{
                  animationDuration: isRotating ? '0.6s' : undefined,
                  animationTimingFunction: 'ease-in-out',
                  animationFillMode: 'forwards',
                  display: 'inline-block',
                  verticalAlign: 'middle'
                }}
              />
            </div>
          </div>
          <div className="w-full sm:w-auto flex justify-center sm:justify-end">
            <ActionButtons onNavigate={onNavigate} />
          </div>
        </div>
        <div className="w-full mt-6 sm:mt-8 lg:mt-8 py-1 text-sm sm:text-md lg:text-md text-gray-500 text-center mx-auto border-t border-gray-400/30 dark:border-[#2f2f2f]">
          <div className="flex items-center justify-center mt-3 sm:mt-4 lg:mt-4 whitespace-nowrap text-inherit dark:text-[#ebeef5]">
            <Image 
              src='/transaction.svg' 
              width={18} 
              height={18} 
              className="mr-2 sm:w-5 sm:h-5 lg:w-5 lg:h-5" 
              alt='Transaction History' 
              style={{ 
                filter: 'invert(92%) sepia(6%) saturate(210%) hue-rotate(186deg) brightness(110%) contrast(98%)', 
                ...(typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? { color: '#ebeef5' } : {}) 
              }} 
            />
            <span className="text-xs sm:text-sm lg:text-md">View All Transaction History</span>
            <ChevronRight size={16} className="ml-4 sm:ml-6 lg:ml-6 dark:text-[#ebeef5] sm:w-5 sm:h-5 lg:w-[18px] lg:h-[18px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundsSummaryCards;