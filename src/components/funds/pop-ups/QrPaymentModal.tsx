import React, { useEffect, useState } from 'react';
import { X, Clock, ChevronLeft } from 'lucide-react';

// UPI app icons/logos - in a real implementation, import actual image files
const UpiIcons = {
  phonepe: (
    <div className="w-6 h-6 bg-purple-700 rounded-md flex items-center justify-center text-white">
      <span className="font-bold text-xs">P</span>
    </div>
  ),
  googlePay: (
    <div className="w-6 h-6 bg-white rounded-full border flex items-center justify-center">
      <div className="flex">
        <span className="text-blue-500 text-xs font-bold">G</span>
        <span className="text-red-500 text-xs font-bold">p</span>
      </div>
    </div>
  ),
  paytm: (
    <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center">
      <span className="text-blue-700 text-xs font-bold">P</span>
    </div>
  ),
  other: (
    <div className="w-6 h-6 bg-green-100 rounded-md flex items-center justify-center">
      <span className="text-green-700 text-xs font-bold">U</span>
    </div>
  )
};

// Profile icon for UPI verification
const ProfileIcon = () => (
  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
    <span className="text-xs">S</span>
  </div>
);

// QR Code payment modal
const QrPaymentModal = ({ isOpen, onClose, onSuccess }: { isOpen: boolean, onClose: () => void, onSuccess?: () => void }) => {
  // Timer state for 5 minutes
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(300);
      return;
    }
    if (timeLeft === 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, timeLeft]);

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(1, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999999]">
      <div 
        className={`rounded-[6px] border shadow-lg overflow-hidden flex flex-col items-center ${
          isDarkMode 
            ? 'bg-[#121212] border-[#2f2f2f]' 
            : 'bg-[#FAFAFA] border-gray-200'
        }`}
        style={{ position: 'relative', width: '420px', height: '490px', maxWidth: '95vw' }}
      >
        {/* Title Row with Back and Close */}
        <div className="w-full flex items-center justify-between mb-4 px-4 pt-4">
          <button 
            onClick={onClose} 
            className={`p-1 mr-2 hover:opacity-80 ${
              isDarkMode ? 'text-[#c9cacc]' : 'text-gray-500'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className={`flex-1 text-lg font-medium text-left ${
            isDarkMode ? 'text-[#ebeef5]' : 'text-gray-900'
          }`}>
            Scan QR
          </h2>
          <button 
            onClick={onClose} 
            className={`p-1 ml-2 hover:opacity-80 ${
              isDarkMode ? 'text-[#c9cacc]' : 'text-gray-500'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* QR Code Container */}
        <div className={`flex flex-col items-center w-[80%] p-[18px] h-[390px] mb-6 ${
          isDarkMode ? 'bg-[#1c1c1c]' : 'bg-white'
        }`}>
          {/* QR Code */}
          <div className={`border rounded-lg p-1.5 m-3 flex items-center justify-center ${
            isDarkMode 
              ? 'bg-white border-[#2f2f2f]' 
              : 'bg-white border-gray-200'
          }`}>
            <img 
              src="data:image/png;base64,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"
              alt="QR Code" 
              className="w-[178px] h-[178px]"
            />
          </div>

          {/* Timer */}
          <div className="flex items-center justify-center mt-4 mb-6 px-[6px]">
            <span className={`flex items-center px-[8px] py-[6px] text-[14px] font-regular rounded-[4px] ${
              isDarkMode 
                ? 'bg-[#2f2f2f] text-[#c9cacc]' 
                : 'bg-[#F7F9FB] text-[#797979]'
            }`}>
              <img 
                src="/funds/TimerLogo.svg" 
                alt="Clock" 
                className={`w-[18px] h-[18px] mr-2 ${
                  isDarkMode 
                    ? 'filter brightness-0 invert' 
                    : ''
                }`}
              />
              {formatTime(timeLeft)}
            </span>
          </div>

          {/* Instruction */}
          <div 
            className={`text-center font-regular mb-[8px] ${
              isDarkMode ? 'text-[#c9cacc]' : 'text-[#6b7280]'
            }`} 
            style={{ fontSize: '16px', fontWeight: 400 }}
          >
            Scan the QR using any UPI App
          </div>

          {/* UPI App Icons */}
          <div className="flex items-center justify-center space-x-2 mt-2 mb-[18px]">
            <img 
              src="/funds/PhonePeLogo.svg" 
              alt="PhonePe" 
              className={isDarkMode ? 'filter brightness-110' : ''} 
              style={{ width: '28px', height: '28px' }} 
            />
            <img 
              src="/funds/GpayLogo.svg" 
              alt="Google Pay" 
              className={isDarkMode ? 'filter brightness-110' : ''} 
              style={{ width: '28px', height: '28px' }} 
            />
            <img 
              src="/funds/PaytmLogo.svg" 
              alt="Paytm" 
              className={isDarkMode ? 'filter brightness-110' : ''} 
              style={{ width: '28px', height: '28px' }} 
            />
            <img 
              src="/funds/UPI.svg" 
              alt="Other UPI" 
              className={isDarkMode ? 'filter brightness-110' : ''} 
              style={{ width: '28px', height: '28px' }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrPaymentModal;