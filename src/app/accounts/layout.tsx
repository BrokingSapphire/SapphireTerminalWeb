import React from "react";
import Navbar from "@/components/gen-components/Navbar";
import Sidebar from "@/components/gen-components/Sidebar";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Trading Platform",
  description: "A modern trading platform interface",
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
        <main className="w-full  p-2 xsm:mt-7 -ml-3 bg-white dark:bg-[#121212]">
          
          {children}
        </main>
      </div>
    </div>
  );
}
