// src/app/layout.tsx
import './globals.css'
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from 'sonner'
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sapphire Terminal",
  description: "Manage your investments and trade efficiently",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="charting_library/charting_library.standalone.js"></script>
        <script src="datafeeds/udf/dist/bundle.js"></script>
      </head>
      <body className="bg-white dark:bg-[#121212]">
        <ThemeProvider>
          {children}
          <Toaster 
            position="top-right"
            theme="system" // This will automatically switch between light/dark
            toastOptions={{
              classNames: {
                toast: 'dark:!bg-[#1E1E1E] dark:!border-gray-600 dark:!text-white',
                description: 'dark:!text-gray-300',
                error: 'dark:!bg-[#1E1E1E] ',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}