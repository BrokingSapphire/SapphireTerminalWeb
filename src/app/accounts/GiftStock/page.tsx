"use client";

import ChooseGiftStockUI from '@/components/profile/Gift Stock/GiftStock';
import React from 'react';
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
      <div className="bg-white dark:bg-[#121212] border-0 dark:border-b dark:border-[#121212]">
          <div className="px-1 py-2">
            <div className="flex items-center gap-1">
              <button
                onClick={handleGoBack}
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-[#C9CACC]" />
              </button>
              <h1 className="text-lg font-medium text-gray-900 dark:text-[#EBEEF5]">
                Gift Stock
              </h1>
            </div>
          </div>
        </div>
      

      {/* Main content with proper spacing */}
      <div className="px-1 py-4">
        <ChooseGiftStockUI />
      </div>
    </div>
  );
};

export default Home;