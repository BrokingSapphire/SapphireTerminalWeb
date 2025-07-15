"use client";
import FreezeDemat from '@/components/profile/FreezeDemat/FreezeDemat';
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();

  const handleGoBack = () => {
    // Go back in browser history
    window.history.back();
    // Or if using Next.js router:
    // router.back();
  };

  const handleFreeze = () => {
    // Navigate to Two Factor Authentication page
    router.push('/accounts/FreezeDemat/TwoFactorAuthentication');
    console.log('Navigating to Two Factor Authentication');
  };

  const handleDontFreeze = () => {
    // Add your don't freeze logic here
    console.log('Account not frozen');
  };

  return (
    <div className=" ">
      {/* Header with back arrow and title */}
      <div className="bg-white dark:bg-[#121413]">
        <div className="px- py-2">
          <div className="flex items-center gap-1">
            <button
              onClick={handleGoBack}
              className="flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-transparent"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-[#ebeef5]" />
            </button>
            <h1 className="text-lg font-medium text-gray-900 dark:text-[#ebeef5]">
              Freeze Demat Account
            </h1>
          </div>
        </div>
      </div>

      {/* Main content with proper spacing */}
      <div className="px-1 py-3">
        <FreezeDemat />
        
        {/* Action buttons */}
        <div className="flex justify-end gap-4 mt-8 mr-5">
          <button
            onClick={handleDontFreeze}
            className="w-[156px] h-[41px] dark:bg-[#ebeef5] rounded-md px-4 py-3 text-[14px] font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            No, Don't Freeze
          </button>
          <button
            onClick={handleFreeze}
            className="w-[156px] h-[41px] bg-[#1DB954] rounded-md px-4 py-3 text-[14px] font-medium text-white hover:bg-[#1AA84A] transition-colors"
          >
            Yes, Freeze
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;