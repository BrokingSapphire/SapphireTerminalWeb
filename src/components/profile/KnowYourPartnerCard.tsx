import React from 'react';
import { Phone } from 'lucide-react';

const KnowYourPartnerCard: React.FC = () => {
  return (
    <div className="bg-[#F7F8FA] rounded-lg p-6 flex flex-col w-full max-w-3xl mx-auto mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar with initials */}
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-lg font-semibold text-green-700">
            NK
          </div>
          <div className="text-lg font-medium text-gray-900">Nakul Pratap Thakur</div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <Phone className="w-5 h-5" />
        </button>
      </div>
      <div className="mt-4">
        <div className="text-xs text-gray-400 font-medium mb-1">Email Address</div>
        <div className="text-sm text-gray-800 mb-3">nakulthakur35@gmail.com</div>
        <div className="text-xs text-gray-400 font-medium mb-1">Address</div>
        <div className="text-sm text-gray-800">K-115-122, FIRST FLOOR MANGAL BAZAR LAXMINAGAR, DELHI LAXMI NAGAR MANGAL BAZAR</div>
      </div>
    </div>
  );
};

export default KnowYourPartnerCard; 