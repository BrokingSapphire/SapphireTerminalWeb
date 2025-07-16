"use client";
import FreezeDemat from "@/components/profile/FreezeDemat/FreezeDemat";
import React from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

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
    router.push("/accounts/FreezeDemat/TwoFactorAuthentication");
    console.log("Navigating to Two Factor Authentication");
  };

  const handleDontFreeze = () => {
    // Add your don't freeze logic here
    console.log("Account not frozen");
  };

  return (
    <div className="bg-white dark:bg-[#121212]">
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
              Freeze Demat Account
            </h1>
          </div>
        </div>
      </div>

      {/* Main content with proper spacing */}
      <div className="px-1 py-3">
        <FreezeDemat />

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-3 sm:gap-4 mt-6 sm:mt-8 px-3 sm:px-0 sm:mr-3 lg:mr-5">
          <button
            onClick={handleDontFreeze}
            className="w-full sm:w-[140px] lg:w-[156px] h-[40px] sm:h-[41px] bg-gray-100 dark:bg-[#ebeef5] rounded-md px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-[14px] font-medium text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors order-2 sm:order-1"
          >
            No, Don't Freeze
          </button>
          <button
            onClick={handleFreeze}
            className="w-full sm:w-[140px] lg:w-[156px] h-[40px] sm:h-[41px] bg-[#1DB954] rounded-md px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-[14px] font-medium text-white hover:bg-[#1AA84A] transition-colors order-1 sm:order-2"
          >
            Yes, Freeze
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
