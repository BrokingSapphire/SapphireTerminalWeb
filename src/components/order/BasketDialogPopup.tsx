import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { IoMdRefresh } from "react-icons/io";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, Move, X } from "lucide-react";
import Image from 'next/image';

// Define proper interfaces for component props and data
interface BasketDialogPopupProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  basketName: string;
}

interface BasketItem {
  type: string;
  security: string;
  qty: number;
  price: number;
  orderType: 'BUY' | 'SELL';
  margin: number;
}

const BasketDialogPopup: React.FC<BasketDialogPopupProps> = ({ 
  open, 
  setOpen, 
  basketName = "Basket1" 
}) => {
  const [includeExisting, setIncludeExisting] = useState<boolean>(false);
  
  // For draggable functionality
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Center the dialog when first opened
  useEffect(() => {
    if (open && dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect();
      setPosition({
        x: (window.innerWidth - rect.width) / 2,
        y: Math.max(20, (window.innerHeight - rect.height) / 2)
      });
    }
  }, [open]);

  // Handle mouse events for dragging
  const startDrag = (e: React.MouseEvent) => {
    if (dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);
  
  // Sample data with proper typing
  const items: BasketItem[] = [
    {
      type: "Intraday",
      security: "MRF",
      qty: 2,
      price: 2045.63,
      orderType: "BUY",
      margin: 467.8,
    },
    {
      type: "Intraday",
      security: "ITC",
      qty: 2,
      price: 2045.63,
      orderType: "BUY",
      margin: 467.8,
    },
    {
      type: "Intraday",
      security: "WIPRO",
      qty: 2,
      price: 2045.63,
      orderType: "BUY",
      margin: 467.8,
    },
  ];
  
  // Custom dialog implementation that's draggable
  return (
    <div 
      ref={dialogRef}
      className={`fixed z-50 bg-white dark:bg-black rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 min-w-[850px] ${open ? 'block' : 'hidden'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'auto'
      }}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between px-6 py-3 bg-[#EAF4F4] dark:bg-gray-900 cursor-grab rounded-t-lg"
        onMouseDown={startDrag}
      >
        <div className="flex items-center gap-2">
          <span className="text-base text-gray-900 dark:text-[#EBEEF5]">{basketName}</span>
          <svg
            className="w-3.5 h-3.5 text-gray-500 dark:text-[#C9CACC]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z" />
          </svg>
        </div>
        <button onClick={() => setOpen(false)}>
        <X  size={28} className="text-gray-500 dark:text-[#C9CACC] hover:text-gray-700 dark:hover:text-gray-300" />
        </button>
       
      </div>

      <div className="px-6 pt-[18px] pb-[24px]">
        {/* Search with border below */}
        <div className="flex justify-end mb-4 pb-4 border-b border-[#E5E7EB] dark:border-gray-700">
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400 dark:text-[#C9CACC]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <Input
              placeholder="Search everything..."
              className="pl-8 h-8 text-sm border-gray-200 dark:border-gray-600 bg-white dark:bg-black text-gray-900 dark:text-[#C9CACC] focus:border-blue-500 dark:focus:border-blue-400"
            />
          </div>
        </div>

        {/* Table */}
        <div className="border border-[#E5E7EB] dark:border-gray-700 rounded">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F4F4F9] dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <TableHead className="text-sm font-medium text-[#424242] dark:text-[#EBEEF5] w-32 border-r border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span>Product Type</span>
                    <span className="text-xs"><ArrowUpDown size={14} className="dark:text-[#C9CACC]" /></span>
                  </div>
                </TableHead>
                <TableHead className="text-sm font-medium text-[#424242] dark:text-[#EBEEF5] border-r border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span>Security (3/50)</span>
                    <span className="text-xs"><ArrowUpDown size={14} className="dark:text-[#C9CACC]" /></span>
                  </div>
                </TableHead>
                <TableHead className="text-sm font-medium text-[#424242] dark:text-[#EBEEF5] w-20 border-r border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span>Qty.</span>
                    <span className="text-xs"><ArrowUpDown size={14} className="dark:text-[#C9CACC]" /></span>
                  </div>
                </TableHead>
                <TableHead className="text-sm font-medium text-[#424242] dark:text-[#EBEEF5] w-36 border-r border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span>Price</span>
                    <span className="text-xs"><ArrowUpDown size={14} className="dark:text-[#C9CACC]" /></span>
                  </div>
                </TableHead>
                <TableHead className="text-sm font-medium text-[#424242] dark:text-[#EBEEF5] w-20 border-r border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span>Type</span>
                    <span className="text-xs"><ArrowUpDown size={14} className="dark:text-[#C9CACC]" /></span>
                  </div>
                </TableHead>
                <TableHead className="text-sm font-medium text-[#424242] dark:text-[#EBEEF5] w-36">
                  <div className="flex items-center justify-between">
                    <span>Margin Req</span>
                    <span className="text-xs"><ArrowUpDown size={14} className="dark:text-[#C9CACC]" /></span>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, i) => (
                <TableRow key={i} className="h-10 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <TableCell className="text-sm border-r border-gray-200 dark:border-gray-700 text-center text-[#515C7A] dark:text-[#C9CACC]">
                    {item.type}
                  </TableCell>
                  <TableCell className="text-sm border-r border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-[#515C7A] dark:text-[#C9CACC]">{item.security}</span>
                      <button>
                        <svg className="w-4 h-4 text-gray-400 dark:text-[#C9CACC]" viewBox="0 0 24 24" fill="none">
                          <circle cx="5" cy="12" r="1" fill="currentColor" />
                          <circle cx="12" cy="12" r="1" fill="currentColor" />
                          <circle cx="19" cy="12" r="1" fill="currentColor" />
                        </svg>
                      </button>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm border-r border-gray-200 dark:border-gray-700 text-center text-[#515C7A] dark:text-[#C9CACC]">
                    {item.qty}
                  </TableCell>
                  <TableCell className="text-sm border-r border-gray-200 dark:border-gray-700 text-right pr-8 text-[#515C7A] dark:text-[#C9CACC]">
                    ₹{item.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="border-r border-gray-200 dark:border-gray-700 text-center">
                    <span className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 text-xs px-3 py-0.5 rounded">
                      BUY
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-right pr-8 text-[#515C7A] dark:text-[#C9CACC]">
                    ₹{item.margin.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Footer - Border top and bottom */}
        <div className="mt-6 pt-4 border-t border-[#E5E7EB] dark:border-gray-700">
          <div className="flex justify-between">
            <div className="flex">
              {/* Margin Required */}
              <div className="mr-8">
                <div className="text-sm text-gray-500 dark:text-[#C9CACC] mb-[6px]">Margin Required</div>
                <div className="text-base font-medium text-gray-900 dark:text-[#EBEEF5]">₹5,908.00</div>
              </div>
              
              {/* Final Margin with Checkbox Below */}
              <div>
                <div>
                  <div className="flex items-center mb-[6px] gap-1">
                    <div className="text-sm text-gray-500 dark:text-[#C9CACC]">Final Margin</div>
                    <Image
                      src="/info.svg"
                      alt="Info Icon"
                      width={16}
                      height={16}
                      className="text-gray-400 dark:invert"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="text-base font-medium text-green-500 dark:text-green-400">
                      ₹5,90,478.00
                    </div>
                    <button className="hover:text-gray-600 dark:hover:text-gray-300">
                      <IoMdRefresh className="w-4 h-4 text-gray-500 dark:text-[#C9CACC]" />
                    </button>
                  </div>
                </div>
                
                {/* Checkbox below final margin */}
                <div className="flex items-center gap-2 mt-2">
                  <Checkbox
                    id="include-positions"
                    checked={includeExisting}
                    onCheckedChange={(checked) => setIncludeExisting(!!checked)}
                    className="w-4 h-4 rounded-sm border-gray-300 dark:border-gray-600 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  />
                  <label
                    htmlFor="include-positions"
                    className="text-xs text-gray-600 dark:text-[#C9CACC]"
                  >
                    Include existing positions
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setOpen(false)}
                className="px-6 py-2 text-sm font-medium text-gray-600 dark:text-[#C9CACC] bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => setOpen(false)}
                className="px-6 py-2 text-sm font-medium text-white bg-green-500 dark:bg-green-600 rounded hover:bg-green-600 dark:hover:bg-green-700"
              >
                Execute
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketDialogPopup;