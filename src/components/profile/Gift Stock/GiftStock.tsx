import React from 'react';
import { Check } from 'lucide-react';

const GiftStocksPage: React.FC = () => {
  const handleSendGift = () => {
    // Navigate to the send gift page
    window.location.href = '/accounts/GiftStock/SendGift';
  };

  return (
    <div className="bg-white w-full flex items-center justify-center mr-28 mb-5">
      {/* Main Container */}
      <div 
        className="flex justify-between items-center bg-[#F8F8FB] rounded-lg  p-6 w-full"
        style={{ height: '269px' }}
      >
        {/* Left Side - Gift Box and Text */}
        <div 
          className="flex flex-col items-center gap-6 ml-6 mb-5"
          style={{ width: '250px', height: '175px' }}
        >
          {/* Gift Box Image */}
          <div className="flex justify-center">
            <img 
              src="/Gift Box.png" 
              alt="Gift Box" 
              className="w-24 h-24 object-contain "
            />
          </div>
          
          {/* Text */}
          <div 
            className="text-center text-gray-800"
            style={{ 
              width: '250px', 
              height: '57px',
              fontFamily: 'Inter',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '100%',
              letterSpacing: '-0.43px'
            }}
          >
            Gift your favorite stocks, mutual funds, and ETFs to your friends and family
          </div>
        </div>

        {/* Right Side - Content */}
        <div 
          className="flex flex-col gap-4 flex-1 ml-6"
          style={{ height: '221px' }}
        >
          {/* Features List with Header */}
          <div 
            className="border border-gray-200 bg-white rounded-lg p-3 flex flex-col gap-3 w-full"
            style={{ 
              height: '186px',
              paddingTop: '12px',
              paddingRight: '16px',
              paddingBottom: '12px',
              paddingLeft: '16px'
            }}
          >
            {/* Header inside the box */}
            <div 
              className="text-gray-800 mb-1"
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

            <div 
              className="flex flex-col gap-3 w-full"
              style={{ 
                height: '104px'
              }}
            >
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#6B7280]" />
                <span 
                  className="text-[#6B7280]"
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
              
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#6B7280]" />
                <span 
                  className="text-[#6B7280]"
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
              
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#6B7280]" />
                <span 
                  className="text-[#6B7280]"
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
              
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#6B7280]" />
                <span 
                  className="text-[#6B7280]"
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '100%',
                    letterSpacing: '-0.43px'
                  }}
                >
                  Once accepted, you'll confirm the transfer to their demat account{' '}
                  <a href="#" className="text-black underline">Learn more</a>
                </span>
              </div>
            </div>
          </div>

          {/* Send Gift Button */}
          <div className="flex justify-end">
            <button 
              onClick={handleSendGift}
              className="bg-[#1DB954] text-white rounded-md hover:bg-[#1ed760] transition-colors duration-200"
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