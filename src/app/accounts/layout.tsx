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
      <div className="flex w-full pt-[60px]">
        <div className="w-[27%]">
          <Sidebar />
        </div>
        <main className="w-[80%] p-8 bg-white dark:bg-white  pl-[28px] pr-[28px]">
          <div className="bg-white w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
