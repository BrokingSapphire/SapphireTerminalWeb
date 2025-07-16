import React from "react";
import Navbar from "@/components/gen-components/Navbar";
import Sidebar from "@/components/gen-components/Sidebar";
import { Inter } from "next/font/google";
import OrderSelector from "../../components/order/OrderSelector";
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
        <div className="w-[30%]">
          <Sidebar />
        </div>
        <main className="w-[80%] p-7 bg-white dark:bg-[#121212]">
          <div className="bg-white w-full">
            <OrderSelector />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
