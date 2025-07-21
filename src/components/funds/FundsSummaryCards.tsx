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
    <>
      <style jsx>{`
        @media (max-width: 550px) {
          .responsive-container {
            width: 100% !important;
            min-width: 0 !important;
            overflow-x: auto !important;
            padding: 0 8px !important;
          }
          .responsive-content {
            padding: 12px !important;
            min-width: 280px !important;
          }
          .responsive-layout {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
          .responsive-text-label {
            font-size: 14px !important;
          }
          .responsive-text-amount {
            font-size: 16px !important;
          }
          .responsive-text-footer {
            font-size: 12px !important;
          }
          .responsive-text-link {
            font-size: 10px !important;
          }
          .responsive-icon {
            width: 16px !important;
            height: 16px !important;
          }
          .responsive-spacing-top {
            margin-top: 24px !important;
          }
          .responsive-spacing-inner {
            margin-top: 12px !important;
          }
          .responsive-spacing-left {
            margin-left: 12px !important;
          }
          .responsive-button-container {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
      
      <div 
        className="responsive-container"
        style={{
          position: 'relative',
          borderRadius: '8px',
          padding: '1px',
          width: '100%',
          minWidth: '800px',
          margin: '0 auto',
          fontSize: '0.875rem',
          overflowX: 'visible'
        }}
      >
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
          pointerEvents: 'none'
        }} />
        
        {/* Content - Fixed layout until 550px */}
        <div className="bg-[#F4F4F9] dark:bg-[#1c1c1c] rounded-lg p-[18px] text-xs responsive-content">
          <div className="flex flex-row items-center justify-between gap-0 responsive-layout">
            <div className="flex flex-col w-auto min-w-0">
              <div className="text-[#6B7080] text-base dark:text-[#c9cacc] responsive-text-label">
                Trading Balance (Cash + Collateral)
              </div>
              <div className="flex items-center mt-1 min-w-0">
                <span className="text-[18px] font-medium dark:text-[#dee1e8] responsive-text-amount">₹49,561.80</span>
                <img
                  src="/RefreshIcon.svg"
                  alt="Refresh"
                  width={16}
                  height={16}
                  className={`ml-2 text-gray-500 cursor-pointer flex-shrink-0 responsive-icon ${isRotating ? 'animate-spin-once' : ''}`}
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
            <div className="w-auto flex justify-end flex-shrink-0 responsive-button-container">
              <ActionButtons onNavigate={onNavigate} />
            </div>
          </div>
          <div className="w-full mt-8 py-1 text-md text-gray-500 text-center mx-auto border-t border-gray-400/30 dark:border-[#2f2f2f] responsive-spacing-top responsive-text-footer">
            <div className="flex items-center justify-center mt-4 text-inherit dark:text-[#ebeef5] min-w-0 responsive-spacing-inner">
              <Image 
                src='/transaction.svg' 
                width={20} 
                height={20} 
                className="mr-2 flex-shrink-0 responsive-icon" 
                alt='Transaction History' 
                style={{ 
                  filter: 'invert(92%) sepia(6%) saturate(210%) hue-rotate(186deg) brightness(110%) contrast(98%)', 
                  ...(typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? { color: '#ebeef5' } : {}) 
                }} 
              />
              <span className="text-md responsive-text-link">View All Transaction History</span>
              <ChevronRight size={18} className="ml-6 dark:text-[#ebeef5] flex-shrink-0 responsive-icon responsive-spacing-left" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FundsSummaryCards;