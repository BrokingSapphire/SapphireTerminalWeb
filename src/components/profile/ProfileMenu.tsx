'use client';
import React from 'react';
import { User, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const items = [
  { label: 'Know your partner' },
  { label: 'Demat account details' },
  { label: 'Active segments' },
  { label: 'Bank Accounts' },
  { label: 'Delete Account' },
  { label: 'Gift Stocks' },
];

const ProfileMenu: React.FC = () => {
  const router = useRouter();
  
  return (
    <div
      className="bg-white dark:bg-[#121212] rounded-lg border border-gray-200 dark:border-gray-700 shadow-xl min-w-[320px] max-w-[350px] py-2 px-0"
      onClick={() => console.log('ProfileMenu container clicked')}
    >
      <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-700">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors text-gray-800 dark:text-gray-300 text-[15px]"
            onClick={() => {
              console.log(item.label + ' menu item clicked');
              
              // Navigate based on menu item
              switch (item.label) {
                case 'Active segments':
                  router.push('/accounts/CurrentSession');
                  break;
                case 'Delete Account':
                  router.push('/accounts/DeleteAccount');
                  break;
                case 'Bank Accounts':
                  router.push('/accounts/Details');
                  break;
                case 'Know your partner':
                  router.push('/accounts/KnowYourPartner');
                  break;
                case 'Demat account details':
                  router.push('/accounts/FreezeDemat');
                  break;
                case 'Gift Stocks':
                  router.push('/accounts/GiftStock');
                  break;
                default:
                  console.log('No route defined for:', item.label);
              }
            }}
          >
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              <span>{item.label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileMenu;