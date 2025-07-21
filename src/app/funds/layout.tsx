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
        {/* Sidebar - Hidden on mobile/tablet, visible on laptop+ - Fixed until 550px */}
        <div className="w-[25%] z-0 max-[550px]:hidden">
          <Sidebar />
        </div>
                
        {/* Main Content - Fixed layout until 550px, then responsive */}
        <main className="w-[75%] py-[28px] pt-0 px-9 fixed top-[84px] left-[25%] pr-[28px] pb-40 overflow-x-auto max-[550px]:w-full max-[550px]:left-0 max-[550px]:px-2 max-[550px]:static max-[550px]:overflow-x-visible">
          {children}
        </main>
      </div>
    </div>
  );
}