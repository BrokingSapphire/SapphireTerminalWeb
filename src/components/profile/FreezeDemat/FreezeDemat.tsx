"use client";
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';

const FreezeDemat = () => {
  return (
    <div className="w-full h-[205px] bg-[#F8F8FB] dark:bg-[#121212] rounded-lg p-6 flex justify-between items-start gap-6 opacity-100">
      {/* Left side - Tree icon and freeze text */}
      <div className="w-[250px] h-[157px] flex flex-col items-center justify-center gap-7 opacity-100">
        {/* Tree/Snowflake icon */}
        <div className="flex-shrink-0">
          <Image 
            src="/snowflake structure.png"
            alt="Snowflake icon"
            width={80}
            height={80}
            className="text-gray-400"
          />
        </div>
        {/* Freeze text */}
        <div className="text-center">
          <p className="text-[15px] font-medium text-gray-900 dark:text-[#ebeef5] leading-[100%] tracking-[-0.43px]" style={{ fontFamily: 'Inter' }}>
            You can freeze your account if you<br />
            detect any suspicious activities.
          </p>
        </div>
      </div>

      {/* Right side - Gift stocks info with rounded border */}
      <div className="flex-1 h-[148px] bg-[#FFFFFF] dark:bg-[#181A20] rounded-lg border border-gray-200 dark:border-[#2f2f2f] p-4 flex flex-col gap-[18px] opacity-100 relative">
        {/* Header with gift icon */}
        <div className="flex items-center gap-3">
          <h3 className="text-[14px] font-normal text-gray-900 dark:text-[#ebeef5] leading-[100%] tracking-[-0.43px]" style={{ fontFamily: 'SF Pro' }}>
            Gift Stocks, Mutual Funds & ETFs with Sapphire Broking
          </h3>
        </div>

        {/* Warning items */}
        <div className="flex flex-col gap-2">
          {/* Item 1 - Orange warning */}
          <div className="flex items-start gap-2">
            <div className="w-4 h-4   flex items-center justify-center flex-shrink-0 mt-0.5">
              <Image 
                src="/warning/lock.png"
                alt="Warning"
                width={12}
                height={12}
              />
            </div>
            <p className="text-[14px] font-normal text-gray-700 dark:text-[#c9cacc] leading-[100%] tracking-[-0.43px]" style={{ fontFamily: 'Inter' }}>
              Anyone using your account will be logged out immediately
            </p>
          </div>

          {/* Item 2 - Brown/amber lock */}
          <div className="flex items-start gap-1">
            <div className="w-4 h-5  flex items-center justify-center flex-shrink-0 mt-0.58">
              <Image 
                src="/warning/securitylock.png"
                alt="Lock"
                width={12}
                height={12}
              />
            </div>
            <p className="text-[14px] font-normal text-gray-700 dark:text-[#c9cacc] leading-[100%] tracking-[-0.43px]" style={{ fontFamily: 'Inter' }}>
              You will not be able to place any trades while your account is frozen
            </p>
          </div>

          {/* Item 3 - Red error */}
          <div className="flex items-start gap-1">
            <div className="w-4 h-5 flex items-center justify-center flex-shrink-0 mt-0.58 ">
              <Image 
                src="/warning/cross.png"
                alt="Error"
                width={12}
                height={12}
              />
            </div>
            <p className="text-[14px] font-normal text-gray-700 dark:text-[#c9cacc] leading-[100%] tracking-[-0.43px]" style={{ fontFamily: 'Inter' }}>
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
    <div className="">
      {/* Main content with proper spacing */}
      <div className="px-1 py-3">
        <FreezeDemat />
      </div>
    </div>
  );
};

export default Home;