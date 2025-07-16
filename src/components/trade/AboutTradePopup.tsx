import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface AboutTradePopupProps {
  isOpen: boolean;
  onClose: () => void;
  tradeData: {
    entryPrice: string | number;
    target: string | number;
    stopLoss: string | number;
    quantity: string | number;
    marginRequire: string | number;
    holdDuration: string | number;
    postedBy: string | number;
    date: string;
    status: string;
  };
}

const AboutTradePopup: React.FC<AboutTradePopupProps> = ({
  isOpen,
  onClose,
  tradeData
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // System theme detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Theme colors
  const theme = {
    background: isDarkMode ? '#121212' : '#ffffff',
    surface: isDarkMode ? '#23232399' : '#F4F4F9',
    headerBg: isDarkMode ? '#1a1a1a' : '#EAF4F4',
    border: isDarkMode ? '#2F2F2F' : '#e1e5e9',
    text: {
      primary: isDarkMode ? '#EBEEF5' : '#1A1A1A',
      secondary: isDarkMode ? '#C9CACC' : '#6b7280',
    },
    statusBg: isDarkMode ? '#2F2F2F' : '#FFF6DC',
  };

  if (!isOpen) return null;

  // Format numbers with commas
  const formatNumber = (value: string | number): string => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return value.toString();
    return num.toLocaleString('en-IN');
  };

  // Get status color
  const getStatusColor = (status: string): string => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('target')) return 'text-[#FFBF00]';
    if (statusLower.includes('profit') || statusLower.includes('success')) return 'text-green-500';
    if (statusLower.includes('loss') || statusLower.includes('stop')) return 'text-red-500';
    return isDarkMode ? 'text-gray-400' : 'text-gray-600';
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div 
        className="rounded-lg shadow-md max-w-md w-full mx-auto"
        style={{
          backgroundColor: theme.background,
          boxShadow: isDarkMode ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        }}
      >
        {/* Header */}
        <div 
          className="px-6 py-4 rounded-t-lg flex items-center justify-between border-b"
          style={{
            backgroundColor: theme.headerBg,
            borderBottomColor: theme.border
          }}
        >
          <h2 className="text-base font-medium" style={{ color: theme.text.primary }}>
            About Trade
          </h2>
          <button
            onClick={onClose}
            className="hover:opacity-70 transition-colors"
            style={{ color: theme.text.secondary }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-3 px-4 space-y-6">
          {/* First Row - Entry Price, Target, Stop Loss */}
          <div 
            className="grid grid-cols-3 px-2 py-3 rounded-md gap-3"
            style={{ backgroundColor: theme.surface }}
          >
            <div className="text-center">
              <p className="text-sm font-normal mb-1" style={{ color: theme.text.secondary }}>
                Entry Price
              </p>
              <p className="text-base font-normal" style={{ color: theme.text.primary }}>
                {formatNumber(tradeData.entryPrice)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-normal mb-1" style={{ color: theme.text.secondary }}>
                Target
              </p>
              <p className="text-base font-normal" style={{ color: theme.text.primary }}>
                {formatNumber(tradeData.target)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-normal mb-1" style={{ color: theme.text.secondary }}>
                Stop Loss
              </p>
              <p className="text-base font-normal" style={{ color: theme.text.primary }}>
                ₹{formatNumber(tradeData.stopLoss)}
              </p>
            </div>
          </div>

          {/* Data Rows */}
          <div className="space-y-3 px-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-normal" style={{ color: theme.text.secondary }}>
                Quantity
              </span>
              <span className="text-sm font-normal" style={{ color: theme.text.primary }}>
                {formatNumber(tradeData.quantity)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-normal" style={{ color: theme.text.secondary }}>
                Margin Require
              </span>
              <span className="text-sm font-normal" style={{ color: theme.text.primary }}>
                {formatNumber(tradeData.marginRequire)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-normal" style={{ color: theme.text.secondary }}>
                Hold Duration
              </span>
              <span className="text-sm font-normal" style={{ color: theme.text.primary }}>
                {formatNumber(tradeData.holdDuration)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-normal" style={{ color: theme.text.secondary }}>
                Posted By
              </span>
              <span className="text-sm font-normal" style={{ color: theme.text.primary }}>
                {formatNumber(tradeData.postedBy)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-normal" style={{ color: theme.text.secondary }}>
                Date
              </span>
              <span className="text-sm font-normal" style={{ color: theme.text.primary }}>
                {tradeData.date}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-normal" style={{ color: theme.text.secondary }}>
                Status
              </span>
              <span 
                className={`text-[10px] p-1 rounded font-normal ${getStatusColor(tradeData.status)}`}
                style={{ backgroundColor: theme.statusBg }}
              >
                {tradeData.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTradePopup;