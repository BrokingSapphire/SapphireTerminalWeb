"use client";

import SessionManagement from '@/components/profile/SessionManagement';   
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
      <div className="bg-white ">
        <div className="px- py-2">
          <div className="flex items-center gap-1">
            <button 
              onClick={handleGoBack}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-lg font-medium text-gray-900">
              Session Management
            </h1>
          </div>
        </div>
      </div>

      {/* Main content with proper spacing */}
      <div className="px-1 py-4">
        <SessionManagement />
      </div>
    </div>
  );
};

export default Home