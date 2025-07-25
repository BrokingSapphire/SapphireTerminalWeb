import React from "react";
import Navbar from "@/components/gen-components/Navbar";
import Sidebar from "@/components/gen-components/Sidebar";
import { Inter } from "next/font/google";
import TradeSelector from "./components/TradeSelector";

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
        {/* Sidebar: hidden on mobile */}
        <div className="w-[30%] hidden xsm:block">
          <Sidebar />
        </div>
        {/* Main content: full width on mobile, 80% on desktop */}
        <main className="w-full xsm:w-[80%] p-2 xsm:p-7 bg-white dark:bg-[#121212]">
          <div className="bg-white w-full">
            <TradeSelector />
          </div>
          <div className="mr-2 -ml-5">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}