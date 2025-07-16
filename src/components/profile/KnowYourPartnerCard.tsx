import React from 'react';
import { Phone } from 'lucide-react';

const KnowYourPartnerCard: React.FC = () => {
  return (
    <div className="bg-[#F7F8FA] dark:bg-[#121212] rounded-lg p-4 sm:p-6 flex flex-col w-full max-w-3xl mt-4 border border-transparent dark:border-gray-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Avatar with initials */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-base sm:text-lg font-semibold text-green-700 dark:text-green-300 flex-shrink-0">
            NK
          </div>
          <div className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">Nakul Pratap Thakur</div>
        </div>
        <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 self-start sm:self-center">
          <Phone className="w-5 h-5" />
        </button>
      </div>
      <div className="mt-4 space-y-3">
        <div>
          <div className="text-xs text-gray-400 dark:text-gray-500 font-medium mb-1">Email Address</div>
          <div className="text-sm text-gray-800 dark:text-gray-300 break-all">nakulthakur35@gmail.com</div>
        </div>
        <div>
          <div className="text-xs text-gray-400 dark:text-gray-500 font-medium mb-1">Address</div>
          <div className="text-sm text-gray-800 dark:text-gray-300 leading-relaxed">K-115-122, FIRST FLOOR MANGAL BAZAR LAXMINAGAR, DELHI LAXMI NAGAR MANGAL BAZAR</div>
        </div>
      </div>
    </div>
  );
};

export default KnowYourPartnerCard;