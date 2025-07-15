"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { X, ArrowRight, Plus, Search } from "lucide-react";

export function DraggableGttOrderFlow() {
  const [isSell, setIsSell] = useState(false);
  const [showStockSearchDialog, setShowStockSearchDialog] = useState(false);
  const [showGttDialog, setShowGttDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  
  // For dragging
  const stockSearchDialogRef = useRef<HTMLDivElement>(null);
  const gttDialogRef = useRef<HTMLDivElement>(null);
  
  const [stockSearchPosition, setStockSearchPosition] = useState({ x: 0, y: 0 });
  const [gttPosition, setGttPosition] = useState({ x: 0, y: 0 });
  const [isDraggingStockSearch, setIsDraggingStockSearch] = useState(false);
  const [isDraggingGtt, setIsDraggingGtt] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Dummy stock data
  const stocksData = [
    { name: "Reliance Industries Ltd.", symbol: "RELIANCE", exchange: "NSE", price: 1687.45, change: -19.10, changePercent: -2.70 },
    { name: "Tata Consultancy Services Ltd.", symbol: "TCS", exchange: "NSE", price: 3456.20, change: 34.80, changePercent: 1.02 },
    { name: "HDFC Bank Ltd.", symbol: "HDFCBANK", exchange: "NSE", price: 1587.75, change: 12.35, changePercent: 0.78 },
    { name: "Infosys Ltd.", symbol: "INFY", exchange: "NSE", price: 1467.90, change: -5.60, changePercent: -0.38 },
    { name: "ICICI Bank Ltd.", symbol: "ICICIBANK", exchange: "NSE", price: 945.30, change: 8.75, changePercent: 0.93 }
  ];

  // Filter stocks based on search query
  const filteredStocks = stocksData.filter(stock => 
    stock.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Center the dialogs when first opened
  useEffect(() => {
    if (showStockSearchDialog && stockSearchDialogRef.current) {
      const rect = stockSearchDialogRef.current.getBoundingClientRect();
      setStockSearchPosition({
        x: (window.innerWidth - rect.width) / 2,
        y: (window.innerHeight - rect.height) / 2
      });
    }
  }, [showStockSearchDialog]);
  
  useEffect(() => {
    if (showGttDialog && gttDialogRef.current) {
      const rect = gttDialogRef.current.getBoundingClientRect();
      setGttPosition({
        x: (window.innerWidth - rect.width) / 2,
        y: (window.innerHeight - rect.height) / 2
      });
    }
  }, [showGttDialog]);
  
  // Handle mouse events for dragging
  const startDragStockSearch = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (stockSearchDialogRef.current) {
      const rect = stockSearchDialogRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDraggingStockSearch(true);
    }
  };
  
  const startDragGtt = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (gttDialogRef.current) {
      const rect = gttDialogRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDraggingGtt(true);
    }
  };
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingStockSearch) {
        setStockSearchPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      } else if (isDraggingGtt) {
        setGttPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };
    
    const handleMouseUp = () => {
      setIsDraggingStockSearch(false);
      setIsDraggingGtt(false);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingStockSearch, isDraggingGtt, dragOffset]);

  type Stock = {
    name: string;
    symbol: string;
    exchange: string;
    price: number;
    change: number;
    changePercent: number;
  };

  const handleStockSelection = (stock: Stock) => {
    setSelectedStock(stock);
    setShowStockSearchDialog(false);
    setShowGttDialog(true);
  };

  const handleGttCancel = () => {
    setShowGttDialog(false);
    setSelectedStock(null);
  };

  const handleStockSearchCancel = () => {
    setShowStockSearchDialog(false);
    setSearchQuery("");
  };

  return (
    <>
      {/* Trigger Button */}
      <button 
        className="flex items-center bg-[#F4F4F9] dark:bg-gray-800 text-xs text-[#1A1A1A] dark:text-[#EBEEF5] px-3 py-[10px] rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        onClick={() => setShowStockSearchDialog(true)}
      >
        <Plus size={18} className="mr-2" /> New GTT Order
      </button>

      {/* Stock Search Dialog (Draggable) */}
      {showStockSearchDialog && (
        <div 
          ref={stockSearchDialogRef}
          className="fixed z-50 bg-white dark:bg-black rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-[500px]"
          style={{
            left: `${stockSearchPosition.x}px`,
            top: `${stockSearchPosition.y}px`,
            cursor: isDraggingStockSearch ? 'grabbing' : 'auto'
          }}
        >
          {/* Header with grab handle */}
          <div 
            className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 cursor-grab bg-[#F4F4F9] dark:bg-gray-900 rounded-t-lg"
            onMouseDown={startDragStockSearch}
          >
            <div className="flex items-center">
              <h2 className="text-lg font-normal text-gray-900 dark:text-[#EBEEF5]">Select Stock</h2>
            </div>
            <button 
              onClick={handleStockSearchCancel} 
              className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-4">
            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-[#C9CACC] h-4 w-4" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-10 text-base bg-white dark:bg-black border-gray-200 dark:border-gray-600 text-gray-900 dark:text-[#C9CACC] focus:border-blue-500 dark:focus:border-blue-400"
                placeholder="Search stocks..."
              />
            </div>

            {/* Stock List */}
            <div className="max-h-[300px] overflow-y-auto">
              {filteredStocks.map((stock, index) => (
                <div 
                  key={index}
                  onClick={() => handleStockSelection(stock)}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border-b border-gray-200 dark:border-gray-700"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-[#EBEEF5]">{stock.name}</p>
                    <p className="text-sm text-gray-500 dark:text-[#C9CACC]">{stock.symbol}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-[#C9CACC] px-2 py-0.5 rounded mr-2">{stock.exchange}</span>
                    <div className="text-right">
                      <p className="font-medium text-gray-900 dark:text-[#EBEEF5]">₹{stock.price.toFixed(2)}</p>
                      <p className={`text-xs ${stock.change >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                        {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredStocks.length === 0 && (
                <div className="p-4 text-center text-gray-500 dark:text-[#C9CACC]">
                  No stocks found matching "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* GTT Order Dialog (Draggable) */}
      {showGttDialog && selectedStock && (
        <div 
          ref={gttDialogRef}
          className="fixed z-50 bg-white dark:bg-black rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-[600px]"
          style={{
            left: `${gttPosition.x}px`,
            top: `${gttPosition.y}px`,
            cursor: isDraggingGtt ? 'grabbing' : 'auto'
          }}
        >
          {/* Header with drag handle */}
          <div 
            className="flex bg-[#F4F4F9] dark:bg-gray-900 flex-row items-center justify-between p-3 cursor-grab rounded-t-lg"
            onMouseDown={startDragGtt}
          >
            <div className="flex-1">
              <div className="flex items-center">
                <div className="text-base font-medium flex items-center gap-1.5 text-gray-900 dark:text-[#EBEEF5]">
                  {selectedStock.name}
                  <span className="text-[11px] font-normal text-muted-foreground dark:text-[#C9CACC] bg-[#B8D8D9]/30 dark:bg-gray-700 px-1 rounded">
                    {selectedStock.exchange}
                  </span>
                </div>
              </div>
              <p className="mt-0.5 text-sm text-gray-700 dark:text-[#C9CACC]">
                {selectedStock.price.toFixed(2)}
                <span className={`text-xs ${selectedStock.change >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                  {' '}{selectedStock.change >= 0 ? '+' : ''}{selectedStock.change.toFixed(2)} ({selectedStock.change >= 0 ? '+' : ''}{selectedStock.changePercent.toFixed(2)}%)
                </span>
              </p>
            </div>

            {/* BUY/SELL Toggle */}
            <div className="flex mr-8 items-center gap-1">
              <Button
                variant={isSell ? "ghost" : "default"}
                onClick={() => setIsSell(false)}
                className={`h-7 px-3 rounded-md ${
                  !isSell
                    ? "bg-[#00C853] hover:bg-[#00B84D] text-white dark:bg-[#00C853] dark:hover:bg-[#00B84D]"
                    : "text-[#00C853]/60 hover:text-[#00B84D] bg-[#00B84D]/20 hover:bg-[#00B84D]/30 dark:text-[#00C853]/80 dark:hover:text-[#00B84D] dark:bg-[#00B84D]/20 dark:hover:bg-[#00B84D]/30"
                }`}
              >
                BUY
              </Button>
              <Switch
                checked={isSell}
                onCheckedChange={setIsSell}
                className="data-[state=checked]:bg-[#FF3B30] mx-1 data-[state=unchecked]:bg-[#00C853] dark:data-[state=checked]:bg-[#FF3B30] dark:data-[state=unchecked]:bg-[#00C853]"
              />
              <Button
                onClick={() => setIsSell(true)}
                className={`h-7 px-3 rounded-md ${
                  isSell
                    ? "bg-[#FF3B30] hover:bg-[#E63529] text-white dark:bg-[#FF3B30] dark:hover:bg-[#E63529]"
                    : "text-[#FF3B30]/40 hover:text-[#E63529] bg-[#FF3B30]/10 hover:bg-[#FF3B30]/30 dark:text-[#FF3B30]/60 dark:hover:text-[#E63529] dark:bg-[#FF3B30]/10 dark:hover:bg-[#FF3B30]/30"
                }`}
              >
                SELL
              </Button>
            </div>
            
            <button 
              onClick={handleGttCancel} 
              className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 ml-2"
            >
              <X size={28} />
            </button>
          </div>

          <div className="px-3 pt-2 pb-3">
            {/* Trigger Type */}
            <div className="flex items-center gap-3 mb-[18px]">
              <Label className="text-sm text-gray-600 dark:text-[#EBEEF5]">Trigger Type :</Label>
              <RadioGroup
                defaultValue="single"
                className="flex items-center gap-4"
              >
                <div className="flex items-center gap-1.5">
                  <RadioGroupItem
                    value="single"
                    id="single"
                    className="h-4 w-4 border-gray-300 dark:border-gray-600 text-primary dark:text-primary"
                  />
                  <Label htmlFor="single" className="text-sm font-normal text-gray-700 dark:text-[#C9CACC]">
                    Single
                  </Label>
                </div>
                <div className="flex items-center gap-1.5">
                  <RadioGroupItem 
                    value="ocd" 
                    id="ocd" 
                    className="h-4 w-4 border-gray-300 dark:border-gray-600 text-primary dark:text-primary" 
                  />
                  <Label htmlFor="ocd" className="text-sm font-normal text-gray-700 dark:text-[#C9CACC]">
                    OCD
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Stock Info Display */}
            <div className="mb-4 text-sm border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-2 rounded-md">
              <span className="font-medium text-gray-900 dark:text-[#EBEEF5]">Stock:</span> 
              <span className="text-gray-700 dark:text-[#C9CACC]"> {selectedStock.symbol} ({selectedStock.exchange})</span>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-[1.2fr,auto,1fr,1.2fr] items-end gap-3">
              {/* Trigger Price */}
              <div>
                <Label htmlFor="trigger-price" className="text-sm mb-1.5 block text-gray-700 dark:text-[#EBEEF5]">
                  Trigger Price
                </Label>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-[#C9CACC]">
                    ₹
                  </span>
                  <Input
                    id="trigger-price"
                    type="number"
                    defaultValue="0"
                    className="pl-5 h-9 border-gray-200 dark:border-gray-600 bg-white dark:bg-black text-gray-900 dark:text-[#C9CACC] focus:border-blue-500 dark:focus:border-blue-400"
                  />
                </div>
              </div>

              {/* Places Order Arrow */}
              <div className="flex items-center text-xs text-gray-500 dark:text-[#C9CACC] mb-[9px] whitespace-nowrap">
                Places Order
                <ArrowRight className="h-3 w-3 ml-0.5 stroke-[1.5]" />
              </div>

              {/* Quantity */}
              <div>
                <Label htmlFor="quantity" className="text-sm mb-1.5 block text-gray-700 dark:text-[#EBEEF5]">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  defaultValue="0"
                  className="h-9 border-gray-200 dark:border-gray-600 bg-white dark:bg-black text-gray-900 dark:text-[#C9CACC] focus:border-blue-500 dark:focus:border-blue-400"
                />
              </div>

              {/* Price */}
              <div>
                <Label htmlFor="price" className="text-sm mb-1.5 block text-gray-700 dark:text-[#EBEEF5]">
                  Price
                </Label>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-[#C9CACC]">
                    ₹
                  </span>
                  <Input
                    id="price"
                    type="number"
                    defaultValue="0"
                    className="pl-5 h-9 border-gray-200 dark:border-gray-600 bg-white dark:bg-black text-gray-900 dark:text-[#C9CACC] focus:border-blue-500 dark:focus:border-blue-400"
                  />
                  <div className="absolute -bottom-8 right-0 flex items-center gap-1">
                    <input
                      type="text"
                      value="5"
                      className="w-8 h-6 text-center text-xs border border-gray-200 dark:border-gray-600 rounded bg-white dark:bg-black text-gray-900 dark:text-[#C9CACC]"
                    />
                    <span className="text-xs text-gray-500 dark:text-[#C9CACC]">% of LTP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 border-t border-gray-200 dark:border-gray-700 p-3 mt-4">
            <Button
              variant="secondary"
              onClick={handleGttCancel}
              className="h-8 px-6 hover:bg-gray-100 dark:hover:bg-gray-800 border-none text-gray-700 dark:text-[#C9CACC] bg-gray-50 dark:bg-gray-900"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-8 px-6 bg-[#00C852] hover:bg-[#00B84D] dark:bg-[#00C852] dark:hover:bg-[#00B84D] text-white"
            >
              Place
            </Button>
          </div>
        </div>
      )}
    </>
  );
}