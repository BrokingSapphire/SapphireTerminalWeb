"use client";
import React from 'react';

const FreezeDemat = () => {
  return (
    <div className="w-full min-h-[180px] bg-[#F8F8FB] dark:bg-[#121413] border-0 dark:border dark:border-[#2F2F2F] rounded-lg p-2 flex flex-col lg:flex-row justify-between items-start gap-2 opacity-100 mr-4 sm:mr-8 lg:mr-10">
      {/* Left side - Tree icon and freeze text */}
      <div className="w-full lg:w-[180px] lg:h-[120px] flex flex-col items-center justify-center gap-3 opacity-100 order-1 lg:order-none">
        {/* Tree/Snowflake icon */}
        <div className="flex-shrink-0">
          <img 
            src="/snowflake structure.png"
            alt="Snowflake icon"
            className="w-16 h-16 text-gray-400"
          />
        </div>
        {/* Freeze text */}
        <div className="text-center px-2">
          <p className="text-[13px] font-medium text-gray-900 dark:text-[#EBEEF5] leading-[120%] tracking-[-0.43px]"
              style={{ fontFamily: 'Inter' }}>
            You can freeze your account if you detect any suspicious activities.
          </p>
        </div>
      </div>

      {/* Right side - Gift stocks info with rounded border */}
      <div className="flex-1 w-full lg:h-[120px] bg-white dark:bg-[#121413] rounded-lg border border-gray-200 dark:border-[#2F2F2F] p-2 flex flex-col gap-2 opacity-100 relative order-2 lg:order-none">
        {/* Header with gift icon */}
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-normal text-gray-900 dark:text-[#EBEEF5] leading-[120%] tracking-[-0.43px]"
               style={{ fontFamily: 'SF Pro' }}>
            Gift Stocks, Mutual Funds & ETFs with Sapphire Broking
          </h3>
        </div>

        {/* Warning items */}
        <div className="flex flex-col gap-2">
          {/* Item 1 - Orange warning */}
          <div className="flex items-start gap-2">
            <div className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0 mt-1">
              <img 
                src="/warning/lock.png"
                alt="Warning"
                className="w-3 h-3"
              />
            </div>
            <p className="text-xs font-normal text-gray-700 dark:text-[#C9CACC] leading-[120%] tracking-[-0.43px]"
                style={{ fontFamily: 'Inter' }}>
              Anyone using your account will be logged out immediately
            </p>
          </div>

          {/* Item 2 - Brown/amber lock */}
          <div className="flex items-start gap-2">
            <div className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0 mt-1">
              <img 
                src="/warning/securitylock.png"
                alt="Lock"
                className="w-3 h-3"
              />
            </div>
            <p className="text-xs font-normal text-gray-700 dark:text-[#C9CACC] leading-[120%] tracking-[-0.43px]"
                style={{ fontFamily: 'Inter' }}>
              You will not be able to place any trades while your account is frozen
            </p>
          </div>

          {/* Item 3 - Red error */}
          <div className="flex items-start gap-2">
            <div className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0 mt-1">
              <img 
                src="/warning/cross.png"
                alt="Error"
                className="w-3 h-3"
              />
            </div>
            <p className="text-xs font-normal text-gray-700 dark:text-[#C9CACC] leading-[120%] tracking-[-0.43px]"
                style={{ fontFamily: 'Inter' }}>
              This is a temporary block. You can unfreeze your account at any time
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const handleGoBack = () => {
    window.history.back();
    // Or if using Next.js router:
    // router.back();
  };

  return (
    <div className="bg-white dark:bg-[#121212]">
      {/* Main content with minimal spacing */}
      <div className="p-2 sm:p-3">
        <FreezeDemat />
      </div>
    </div>
  );
};

export default Home;