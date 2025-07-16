"use client";

import SessionManagement from '@/components/profile/SessionManagement/CurrentSession';   
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
      <div className="bg-white dark:bg-[#121212] ">
        <div className="px- py-2">
          <div className="flex items-center gap-1">
            <button 
              onClick={handleGoBack}
              className="flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-transparent"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-[#ebeef5]" />
            </button>
            <h1 className="text-[16px] font-semibold text-gray-900 dark:text-[#F4F4F9]">
              Session Management
            </h1>
          </div>
        </div>
      </div>

      {/* Main content with proper spacing */}
      <div className="px-1 py-4 bg-white dark:bg-[#121212] text-gray-900 dark:text-[#F4F4F9]">
        <SessionManagement />
      </div>
    </div>
  );
};

export default Home