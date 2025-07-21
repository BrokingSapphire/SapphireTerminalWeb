"use client";
import React, { useState, useRef, useEffect } from "react";
import BasketDialogPopup from "@/components/order/BasketDialogPopup";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreVertical, Plus, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import SearchButton from "@/components/gen-components/SearchButton";

interface BasketItem {
  id: string;
  name: string;
  date: string;
  items: string;
}

interface BasketNameInputProps {
  show: boolean;
  onClose: () => void;
  onConfirm: (name: string) => void;
}

const BasketNameInput: React.FC<BasketNameInputProps> = ({ show, onClose, onConfirm }) => {
  const [basketName, setBasketName] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (show && dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect();
      setPosition({
        x: (window.innerWidth - rect.width) / 2,
        y: (window.innerHeight - rect.height) / 2,
      });
    }
  }, [show]);

  const startDrag = (e: React.MouseEvent) => {
    if (dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleConfirm = () => {
    if (basketName.trim()) {
      onConfirm(basketName);
      setBasketName("");
    }
  };

  if (!show) return null;

  return (
    <div
      ref={dialogRef}
      className="fixed z-50 bg-white dark:bg-[#121212] rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-[320px]"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? "grabbing" : "auto",
      }}
    >
      <div
        className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 cursor-grab bg-[#F4F4F9] dark:bg-gray-900 rounded-t-lg"
        onMouseDown={startDrag}
      >
        <h2 className="text-sm font-medium text-gray-900 dark:text-[#EBEEF5]">
          Create New Basket
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <label
            htmlFor="basket-name"
            className="text-sm mb-1 block text-gray-700 dark:text-[#EBEEF5]"
          >
            Enter Basket Name
          </label>
          <Input
            id="basket-name"
            value={basketName}
            onChange={(e) => setBasketName(e.target.value)}
            className="h-9 text-sm bg-white dark:bg-[#121212] border-gray-200 dark:border-gray-600 text-gray-900 dark:text-[#C9CACC] focus:border-blue-500 dark:focus:border-blue-400"
            placeholder=""
          />
        </div>

        <Button
          onClick={handleConfirm}
          className="w-full h-9 bg-[#00C852] hover:bg-[#00B84D] dark:bg-[#00C852] dark:hover:bg-[#00B84D] text-white text-sm"
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default function Page() {
  const [showDialog, setShowDialog] = useState(false);
  const [showBasketNameInput, setShowBasketNameInput] = useState(false);
  const [selectedBasket, setSelectedBasket] = useState<BasketItem | null>(null);

  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const baskets: BasketItem[] = [
    { id: "234566", name: "Stocks", date: "24 Jan 2025", items: "467.80" },
    { id: "244566", name: "Mutual Funds", date: "24 Jan 2025", items: "467.80" },
    { id: "454567", name: "Stock 2", date: "24 Jan 2025", items: "467.80" },
  ];

  const handleBasketClick = (basket: BasketItem) => {
    setSelectedBasket(basket);
    setShowDialog(true);
  };

  const handleBasketNameConfirm = (name: string) => {
    const newId = Math.floor(Math.random() * 1000000).toString();
    const currentDate = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    setSelectedBasket({
      id: newId,
      name,
      date: currentDate,
      items: "0.00",
    });

    setShowBasketNameInput(false);
    setShowDialog(true);
  };

  return (
    <div className="w-full dark:bg-[#121212] xsm:w-[1100px] px-2 xsm:px-0" style={{ margin: '0 auto' }}>
      <div className="bg-white dark:bg-[#121212] w-full xsm:w-[1100px] px-2 xsm:px-0" style={{ margin: '0 auto' }}>
        <div className="flex justify-between items-center pt-6 pb-1 mb-2 mt-1 ml-1 xsm:pt-6 xsm:pb-1 xsm:mb-2 xsm:mt-1 xsm:ml-1 px-2 xsm:px-0">
          <button
            className="flex items-center bg-[#F4F4F9] dark:bg-[#2F2F2F] text-xs text-[#2F2F2F] dark:text-white px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-[#2F2F2F] transition-colors"
            onClick={() => setShowBasketNameInput(true)}
          >
            <Plus size={14} className="mr-1" /> Basket Order
          </button>
          <div
            className="relative flex items-center transition-all duration-200 overflow-hidden"
            style={{ width: searchExpanded ? 192 : 32 }}
          >
            <button
              onClick={() => setSearchExpanded(true)}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center z-10"
              aria-label="Expand search"
              tabIndex={searchExpanded ? -1 : 0}
              style={{ pointerEvents: searchExpanded ? "none" : "auto" }}
            >
              <SearchButton />
            </button>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onBlur={() => setSearchExpanded(false)}
              autoFocus={searchExpanded}
              className={`pl-9 pr-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-[#686868] dark:text-[#C9CACC] focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 bg-white dark:bg-[#121212] ${searchExpanded ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              placeholder="Search..."
              style={{ width: searchExpanded ? 192 : 32, minWidth: 0 }}
            />
          </div>
        </div>
        <div className="overflow-x-auto w-full" style={{ borderRadius: '8px' }}>
          <table className="w-full min-w-[800px] border-collapse border border-gray-300 dark:border-[#444]">
            <thead>
              <tr className="bg-[#F4F4F9] dark:bg-[#2F2F2F]" style={{ height: "36px" }}>
                <th className="px-3 py-2 whitespace-nowrap border-r border-[#D1D5DB] dark:border-[#444] text-[#000] dark:text-[#EBEEF5]">
                  <div className="flex justify-between items-center">
                    <span className="mr-1 text-xs font-[400]">Date</span>
                    <ArrowUpDown size={12} className="text-[#515C7A] dark:text-[#EBEEF5]" />
                  </div>
                </th>
                <th className="px-3 py-2 whitespace-nowrap border-r border-[#D1D5DB] dark:border-[#444] text-[#000] dark:text-[#EBEEF5]">
                  <div className="flex justify-between items-center">
                    <span className="mr-1 text-xs font-[400]">Basket ID</span>
                    <ArrowUpDown size={12} className="text-[#515C7A] dark:text-[#EBEEF5]" />
                  </div>
                </th>
                <th className="px-3 py-2 whitespace-nowrap border-r border-[#D1D5DB] dark:border-[#444] text-[#000] dark:text-[#EBEEF5]">
                  <div className="flex justify-between items-center">
                    <span className="mr-1 text-xs font-[400]">Basket Name</span>
                    <ArrowUpDown size={12} className="text-[#515C7A] dark:text-[#EBEEF5]" />
                  </div>
                </th>
                <th className="px-3 py-2 whitespace-nowrap bg-[#F4F4F9] dark:bg-[#2F2F2F] text-[#000] dark:text-[#EBEEF5]">
                  <div className="flex justify-between items-center">
                    <span className="mr-1 text-xs font-[400]">Items</span>
                    <ArrowUpDown size={12} className="text-[#515C7A] dark:text-[#EBEEF5]" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {baskets.map((basket, index) => (
                <tr
                  key={basket.id}
                  className={`border-t border-[#D1D5DB] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer ${index === baskets.length - 1 ? "rounded-b-md overflow-hidden" : ""}`}
                  onClick={() => handleBasketClick(basket)}
                  style={{ height: "32px" }}
                >
                  <td className="px-3 py-2 text-xs text-[#515C7A] dark:text-[#C9CACC] border-r border-[#D1D5DB] dark:border-gray-700">
                    <span>{basket.date}</span>
                  </td>
                  <td className="px-3 py-2 text-xs text-[#515C7A] dark:text-[#C9CACC] border-r border-[#D1D5DB] dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <span>{basket.id}</span>
                      <MoreVertical size={12} className="text-[#515C7A] dark:text-[#C9CACC]" />
                    </div>
                  </td>
                  <td className="px-3 py-2 text-xs text-[#515C7A] dark:text-[#C9CACC] border-r border-[#D1D5DB] dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <span>{basket.name}</span>
                      <MoreVertical size={12} className="text-[#515C7A] dark:text-[#C9CACC]" />
                    </div>
                  </td>
                  <td className="px-3 py-2 text-xs text-[#515C7A] dark:text-[#C9CACC] text-right">
                    <div className="flex justify-end items-center">
                      <span>₹{basket.items}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <BasketNameInput
        show={showBasketNameInput}
        onClose={() => setShowBasketNameInput(false)}
        onConfirm={handleBasketNameConfirm}
      />

      {showDialog && selectedBasket && (
        <BasketDialogPopup
          open={showDialog}
          setOpen={setShowDialog}
          basketName={selectedBasket.name}
        />
      )}
    </div>
  );
}
