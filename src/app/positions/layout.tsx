import React from "react";
import Navbar from "@/components/gen-components/Navbar";
import Sidebar from "@/components/gen-components/Sidebar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Trading Platform - Trades",
  description: "A modern trading platform interface for trades",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      <Navbar />
      <div className="flex w-full pt-[60px] xsm:flex-row flex-col">
        {/* Sidebar: hidden at 1000px and below */}
        <div className="w-[30%] hidden lg:block xxl:block xl:block xsm:block" style={{ minWidth: '220px' }}>
          <Sidebar />
        </div>
        {/* Main content: full width when sidebar hidden */}
        <main className="w-full xsm:w-[80%] p-3 xsm:p-8 bg-white dark:bg-[#121212]">
          <div className="bg-white dark:bg-[#121212] w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
