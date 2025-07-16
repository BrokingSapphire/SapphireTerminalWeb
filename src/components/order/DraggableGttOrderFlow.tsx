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
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // For dragging
  const stockSearchDialogRef = useRef<HTMLDivElement>(null);
  const gttDialogRef = useRef<HTMLDivElement>(null);
  
  const [stockSearchPosition, setStockSearchPosition] = useState({ x: 0, y: 0 });
  const [gttPosition, setGttPosition] = useState({ x: 0, y: 0 });
  const [isDraggingStockSearch, setIsDraggingStockSearch] = useState(false);
  const [isDraggingGtt, setIsDraggingGtt] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // System theme detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Theme colors
  const theme = {
    background: isDarkMode ? '#121413' : '#ffffff',
    surface: isDarkMode ? '#23232399' : '#f8f9fa',
    border: isDarkMode ? '#2F2F2F' : '#e1e5e9',
    text: {
      primary: isDarkMode ? '#EBEEF5' : '#1a1a1a',
      secondary: isDarkMode ? '#C9CACC' : '#6b7280',
    },
    hover: isDarkMode ? '#1a1a1a' : '#f3f4f6',
    input: {
      background: isDarkMode ? '#121413' : '#ffffff',
      border: isDarkMode ? '#2F2F2F' : '#d1d5db',
    }
  };

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
        className="flex items-center text-xs px-3 py-[10px] rounded transition-colors"
        style={{
          backgroundColor: theme.background,
          color: theme.text.primary,
          border: `1px solid ${theme.border}`
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = theme.hover;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = theme.background;
        }}
        onClick={() => setShowStockSearchDialog(true)}
      >
        <Plus size={18} className="mr-2" /> New GTT Order
      </button>

      {/* Stock Search Dialog (Draggable) */}
      {showStockSearchDialog && (
        <div 
          ref={stockSearchDialogRef}
          className="fixed z-50 rounded-lg shadow-xl w-[500px]"
          style={{
            left: `${stockSearchPosition.x}px`,
            top: `${stockSearchPosition.y}px`,
            cursor: isDraggingStockSearch ? 'grabbing' : 'auto',
            backgroundColor: theme.background,
            border: `1px solid ${theme.border}`,
            boxShadow: isDarkMode ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}
        >
          {/* Header with grab handle */}
          <div 
            className="flex items-center justify-between p-4 border-b cursor-grab rounded-t-lg"
            style={{
              backgroundColor: theme.background,
              borderBottomColor: theme.border
            }}
            onMouseDown={startDragStockSearch}
          >
            <div className="flex items-center">
              <h2 className="text-lg font-normal" style={{ color: theme.text.primary }}>Select Stock</h2>
            </div>
            <button 
              onClick={handleStockSearchCancel} 
              className="hover:opacity-70"
              style={{ color: theme.text.secondary }}
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-4">
            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: theme.text.secondary }} />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-10 text-base focus:outline-none"
                style={{
                  backgroundColor: theme.input.background,
                  borderColor: theme.input.border,
                  color: theme.text.secondary
                }}
                placeholder="Search stocks..."
              />
            </div>

            {/* Stock List */}
            <div className="max-h-[300px] overflow-y-auto">
              {filteredStocks.map((stock, index) => (
                <div 
                  key={index}
                  onClick={() => handleStockSelection(stock)}
                  className="flex items-center justify-between p-3 cursor-pointer border-b"
                  style={{
                    borderBottomColor: theme.border
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme.hover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div>
                    <p className="font-medium" style={{ color: theme.text.primary }}>{stock.name}</p>
                    <p className="text-sm" style={{ color: theme.text.secondary }}>{stock.symbol}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm px-2 py-0.5 rounded mr-2" style={{
                      backgroundColor: theme.surface,
                      color: theme.text.secondary,
                      border: `1px solid ${theme.border}`
                    }}>{stock.exchange}</span>
                    <div className="text-right">
                      <p className="font-medium" style={{ color: theme.text.primary }}>₹{stock.price.toFixed(2)}</p>
                      <p className={`text-xs ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredStocks.length === 0 && (
                <div className="p-4 text-center" style={{ color: theme.text.secondary }}>
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
          className="fixed z-50 rounded-lg shadow-xl w-[600px]"
          style={{
            left: `${gttPosition.x}px`,
            top: `${gttPosition.y}px`,
            cursor: isDraggingGtt ? 'grabbing' : 'auto',
            backgroundColor: theme.background,
            border: `1px solid ${theme.border}`,
            boxShadow: isDarkMode ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}
        >
          {/* Header with drag handle */}
          <div 
            className="flex flex-row items-center justify-between p-3 cursor-grab rounded-t-lg"
            style={{
              backgroundColor: theme.background
            }}
            onMouseDown={startDragGtt}
          >
            <div className="flex-1">
              <div className="flex items-center">
                <div className="text-base font-medium flex items-center gap-1.5" style={{ color: theme.text.primary }}>
                  {selectedStock.name}
                  <span className="text-[11px] font-normal px-1 rounded" style={{
                    color: theme.text.secondary,
                    backgroundColor: theme.surface,
                    border: `1px solid ${theme.border}`
                  }}>
                    {selectedStock.exchange}
                  </span>
                </div>
              </div>
              <p className="mt-0.5 text-sm" style={{ color: theme.text.secondary }}>
                {selectedStock.price.toFixed(2)}
                <span className={`text-xs ${selectedStock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
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
                    ? "bg-[#00C853] hover:bg-[#00B84D] text-white"
                    : "text-[#00C853]/60 hover:text-[#00B84D] bg-[#00B84D]/20 hover:bg-[#00B84D]/30"
                }`}
              >
                BUY
              </Button>
              <Switch
                checked={isSell}
                onCheckedChange={setIsSell}
                className="data-[state=checked]:bg-[#FF3B30] mx-1 data-[state=unchecked]:bg-[#00C853]"
              />
              <Button
                onClick={() => setIsSell(true)}
                className={`h-7 px-3 rounded-md ${
                  isSell
                    ? "bg-[#FF3B30] hover:bg-[#E63529] text-white"
                    : "text-[#FF3B30]/40 hover:text-[#E63529] bg-[#FF3B30]/10 hover:bg-[#FF3B30]/30"
                }`}
              >
                SELL
              </Button>
            </div>
            
            <button 
              onClick={handleGttCancel} 
              className="ml-2 hover:opacity-70"
              style={{ color: theme.text.secondary }}
            >
              <X size={28} />
            </button>
          </div>

          <div className="px-3 pt-2 pb-3">
            {/* Trigger Type */}
            <div className="flex items-center gap-3 mb-[18px]">
              <Label className="text-sm" style={{ color: theme.text.primary }}>Trigger Type :</Label>
              <RadioGroup
                defaultValue="single"
                className="flex items-center gap-4"
              >
                <div className="flex items-center gap-1.5">
                  <RadioGroupItem
                    value="single"
                    id="single"
                    className="h-4 w-4 text-primary"
                    style={{ borderColor: theme.border }}
                  />
                  <Label htmlFor="single" className="text-sm font-normal" style={{ color: theme.text.secondary }}>
                    Single
                  </Label>
                </div>
                <div className="flex items-center gap-1.5">
                  <RadioGroupItem 
                    value="ocd" 
                    id="ocd" 
                    className="h-4 w-4 text-primary"
                    style={{ borderColor: theme.border }}
                  />
                  <Label htmlFor="ocd" className="text-sm font-normal" style={{ color: theme.text.secondary }}>
                    OCD
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Stock Info Display */}
            <div className="mb-4 text-sm border p-2 rounded-md" style={{
              borderColor: theme.border,
              backgroundColor: theme.surface
            }}>
              <span className="font-medium" style={{ color: theme.text.primary }}>Stock:</span> 
              <span style={{ color: theme.text.secondary }}> {selectedStock.symbol} ({selectedStock.exchange})</span>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-[1.2fr,auto,1fr,1.2fr] items-end gap-3">
              {/* Trigger Price */}
              <div>
                <Label htmlFor="trigger-price" className="text-sm mb-1.5 block" style={{ color: theme.text.primary }}>
                  Trigger Price
                </Label>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2" style={{ color: theme.text.secondary }}>
                    ₹
                  </span>
                  <Input
                    id="trigger-price"
                    type="number"
                    defaultValue="0"
                    className="pl-5 h-9 focus:outline-none"
                    style={{
                      borderColor: theme.input.border,
                      backgroundColor: theme.input.background,
                      color: theme.text.secondary
                    }}
                  />
                </div>
              </div>

              {/* Places Order Arrow */}
              <div className="flex items-center text-xs mb-[9px] whitespace-nowrap" style={{ color: theme.text.secondary }}>
                Places Order
                <ArrowRight className="h-3 w-3 ml-0.5 stroke-[1.5]" />
              </div>

              {/* Quantity */}
              <div>
                <Label htmlFor="quantity" className="text-sm mb-1.5 block" style={{ color: theme.text.primary }}>
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  defaultValue="0"
                  className="h-9 focus:outline-none"
                  style={{
                    borderColor: theme.input.border,
                    backgroundColor: theme.input.background,
                    color: theme.text.secondary
                  }}
                />
              </div>

              {/* Price */}
              <div>
                <Label htmlFor="price" className="text-sm mb-1.5 block" style={{ color: theme.text.primary }}>
                  Price
                </Label>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2" style={{ color: theme.text.secondary }}>
                    ₹
                  </span>
                  <Input
                    id="price"
                    type="number"
                    defaultValue="0"
                    className="pl-5 h-9 focus:outline-none"
                    style={{
                      borderColor: theme.input.border,
                      backgroundColor: theme.input.background,
                      color: theme.text.secondary
                    }}
                  />
                  <div className="absolute -bottom-8 right-0 flex items-center gap-1">
                    <input
                      type="text"
                      defaultValue="5"
                      className="w-8 h-6 text-center text-xs border rounded"
                      style={{
                        borderColor: theme.input.border,
                        backgroundColor: theme.input.background,
                        color: theme.text.secondary
                      }}
                    />
                    <span className="text-xs" style={{ color: theme.text.secondary }}>% of LTP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 border-t p-3 mt-4" style={{ borderTopColor: theme.border }}>
            <Button
              variant="secondary"
              onClick={handleGttCancel}
              className="h-8 px-6 border-none"
              style={{
                backgroundColor: theme.surface,
                color: theme.text.secondary
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.hover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = theme.surface;
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-8 px-6 bg-[#00C852] hover:bg-[#00B84D] text-white"
            >
              Place
            </Button>
          </div>
        </div>
      )}
    </>
  );
}