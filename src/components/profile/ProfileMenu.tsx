import React from 'react';
import { User, ChevronRight } from 'lucide-react';

const items = [
  { label: 'Know your partner' },
  { label: 'Demat account details' },
  { label: 'Active segments' },
  { label: 'Bank Accounts' },
  { label: 'Delete Account' },
  { label: 'Gift Stocks' },
];

const ProfileMenu: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-xl min-w-[320px] max-w-[350px] py-2 px-0">
      <div className="flex flex-col divide-y divide-gray-100">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors text-gray-800 text-[15px]"
          >
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-400" />
              <span>{item.label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileMenu; 