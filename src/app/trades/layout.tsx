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
      <div className="flex w-full pt-[60px]">
        <div className="hidden lg:block w-[27vw]">
          <Sidebar />
        </div>
        <div
          className="h-auto w-[0.5px] my-[28px] z-100 bg-gray-200 dark:bg-gray-700"
          style={{ overflow: "hidden" }}
        ></div>
        <main className="w-full lg:w-[75%] p-[28px] bg-white dark:bg-[#121212]">
          <div className="bg-white dark:bg-[#121212] w-full">
            <TradeSelector />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}