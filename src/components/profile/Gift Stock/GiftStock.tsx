import React from 'react';
import { Check } from 'lucide-react';

const GiftStocksPage: React.FC = () => {
  const handleSendGift = () => {
    // Navigate to the send gift page
    window.location.href = '/accounts/GiftStock/SendGift';
  };

  return (
    <div className="bg-white dark:bg-[#121212] w-full flex items-center justify-center p-2 sm:p-4 lg:mr-48 lg:mb-5">
      {/* Main Container - Shifted Left */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-[#F8F8FB] dark:bg-[#121413] dark:border dark:border-[#2F2F2F] rounded-lg p-4 sm:p-5 lg:p-6 w-full max-w-5xl lg:h-[269px] gap-6 lg:gap-0">
        
        {/* Left Side - Gift Box and Text */}
        <div className="flex flex-col items-center gap-4 sm:gap-5 lg:gap-6 w-full lg:w-[250px] lg:h-[175px] lg:ml-6 lg:mb-5 order-1 lg:order-none">
          {/* Gift Box Image */}
          <div className="flex justify-center">
            <img 
              src="/Gift Box.png" 
              alt="Gift Box" 
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-24 lg:h-24 object-contain"
            />
          </div>
          
          {/* Text */}
          <div 
            className="text-center text-gray-800 dark:text-[#EBEEF5] lg:w-[250px] lg:h-[57px]"
            style={{ 
              fontFamily: 'Inter',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '120%',
              letterSpacing: '-0.43px'
            }}
          >
            Gift your favorite stocks, mutual funds, and ETFs to your friends and family
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="flex flex-col gap-3 sm:gap-4 flex-1 lg:ml-6 lg:h-[221px] w-full order-2 lg:order-none">
          {/* Features List with Header */}
          <div 
            className="border border-gray-200 dark:border-[#2F2F2F] bg-white dark:bg-[#121413] rounded-lg p-3 sm:p-4 lg:p-3 flex flex-col gap-3 w-full lg:h-[186px]"
            style={{ 
              paddingTop: '12px',
              paddingRight: '16px',
              paddingBottom: '12px',
              paddingLeft: '16px'
            }}
          >
            {/* Header inside the box */}
            <div 
              className="text-gray-800 dark:text-[#EBEEF5] mb-1"
              style={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '100%',
                letterSpacing: '-0.43px'
              }}
            >
              Gift Stocks, Mutual Funds & ETFs with Sapphire Broking
            </div>

            <div className="flex flex-col gap-2 sm:gap-3 w-full lg:h-[104px]">
              <div className="flex items-start gap-2 sm:gap-3">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#6B7280] dark:text-[#C9CACC] flex-shrink-0 mt-0.5" />
                <span 
                  className="text-[#6B7280] dark:text-[#C9CACC]"
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '100%',
                    letterSpacing: '-0.43px'
                  }}
                >
                  Choose stocks, mutual funds, or ETFs from your portfolio
                </span>
              </div>
              
              <div className="flex items-start gap-2 sm:gap-3">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#6B7280] dark:text-[#C9CACC] flex-shrink-0 mt-0.5" />
                <span 
                  className="text-[#6B7280] dark:text-[#C9CACC]"
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '100%',
                    letterSpacing: '-0.43px'
                  }}
                >
                  Recipient gets a notification to accept the gift
                </span>
              </div>
              
              <div className="flex items-start gap-2 sm:gap-3">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#6B7280] dark:text-[#C9CACC] flex-shrink-0 mt-0.5" />
                <span 
                  className="text-[#6B7280] dark:text-[#C9CACC]"
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '100%',
                    letterSpacing: '-0.43px'
                  }}
                >
                  If they don't have an account, they can sign up to receive it
                </span>
              </div>
              
              <div className="flex items-start gap-2 sm:gap-3">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#6B7280] dark:text-[#C9CACC] flex-shrink-0 mt-0.5" />
                <span 
                  className="text-[#6B7280] dark:text-[#C9CACC]"
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '100%',
                    letterSpacing: '-0.43px'
                  }}
                >
                  Once accepted, you'll confirm the transfer to their demat account{' '}
                  <a href="#" className="text-black dark:text-[#EBEEF5] underline">Learn more</a>
                </span>
              </div>
            </div>
          </div>

          {/* Send Gift Button */}
          <div className="flex justify-center sm:justify-center lg:justify-end">
            <button 
              onClick={handleSendGift}
              className="bg-[#1DB954] text-white rounded-md hover:bg-[#1ed760] transition-colors duration-200 w-full sm:w-auto"
              style={{
                width: '156px',
                height: '41px',
                borderRadius: '6px',
                paddingTop: '12px',
                paddingRight: '16px',
                paddingBottom: '12px',
                paddingLeft: '16px',
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: '14px'
              }}
            >
              Send Gift
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftStocksPage;