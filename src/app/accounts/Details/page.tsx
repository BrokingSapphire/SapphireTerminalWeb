"use client";

import AccountDetail from '@/components/profile/AccountDetail';   
import React from 'react'
import { ChevronLeft } from 'lucide-react';

const Home = () => {
  const handleGoBack = () => {
    window.history.back();
    // Or if using Next.js router:
    // router.back();
  };

  return (
    <div className=" ">
      {/* Header with back arrow and title */}
      <div className="bg-white dark:bg-[#121413]">
        <div className="px-3 py-2">
          <div className="flex items-center gap-2">
            <button 
              onClick={handleGoBack}
              className="flex items-center justify-center w-7 h-7 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-transparent"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-[#ebeef5]" />
            </button>
            <h1 className="text-[16px] font-semibold text-gray-900 dark:text-[#ebeef5]">
              Bank Account 
            </h1>
          </div>
        </div>
      </div>

      {/* Main content with proper spacing */}
      <div className="px-3 py-3">
        <AccountDetail />
      </div>
    </div>
  );
};

export default Home