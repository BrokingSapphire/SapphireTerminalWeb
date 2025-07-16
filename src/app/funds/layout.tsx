import React from 'react';
import Navbar from '@/components/gen-components/Navbar';
import Sidebar from '@/components/gen-components/Sidebar';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Trading Platform',
  description: 'A modern trading platform interface',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      <Navbar />
      <div className="flex w-full pt-[74px]">
        {/* Sidebar - Hidden on mobile/tablet, visible on laptop+ */}
        <div className="hidden lg:block lg:w-[25%] z-0">
          <Sidebar />
        </div>
        
        {/* Main Content - Full width on mobile/tablet, 75% on laptop+ */}
        <main className="w-full lg:w-[75%] py-[28px] pt-0 px-2 sm:px-6 lg:px-9 lg:fixed lg:top-[84px] lg:left-[25%] lg:pr-[28px] pb-40">
          {children}
        </main>
      </div>
    </div>
  );
}