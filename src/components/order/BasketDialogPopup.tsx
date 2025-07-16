import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, X, RefreshCw, Search, Info } from "lucide-react";

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
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // For draggable functionality
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
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
      className={`fixed z-50 rounded-lg shadow-xl min-w-[850px] ${open ? 'block' : 'hidden'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'auto',
        backgroundColor: theme.background,
        border: `1px solid ${theme.border}`,
        boxShadow: isDarkMode ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between px-6 py-3 cursor-grab rounded-t-lg"
        style={{
          backgroundColor: theme.background
        }}
        onMouseDown={startDrag}
      >
        <div className="flex items-center gap-2">
          <span className="text-base" style={{ color: theme.text.primary }}>{basketName}</span>
          <svg
            className="w-3.5 h-3.5"
            style={{ color: theme.text.secondary }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z" />
          </svg>
        </div>
        <button onClick={() => setOpen(false)}>
        <X  size={28} className="hover:opacity-70" style={{ color: theme.text.secondary }} />
        </button>
       
      </div>

      <div className="px-6 pt-[18px] pb-[24px]">
        {/* Search with border below */}
        <div className="flex justify-end mb-4 pb-4 border-b" style={{ borderBottomColor: theme.border }}>
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
              <Search className="w-4 h-4" style={{ color: theme.text.secondary }} />
            </div>
            <Input
              placeholder="Search everything..."
              className="pl-8 h-8 text-sm focus:outline-none"
              style={{
                borderColor: theme.input.border,
                backgroundColor: theme.input.background,
                color: theme.text.secondary
              }}
            />
          </div>
        </div>

        {/* Table */}
        <div className="border rounded" style={{ borderColor: theme.border }}>
          <table className="w-full">
            <thead>
              <tr className="hover:bg-opacity-50 border-b" style={{ 
                backgroundColor: theme.background,
                borderBottomColor: theme.border
              }}>
                <th className="text-sm font-medium w-32 border-r p-3 text-left" style={{ 
                  color: theme.text.primary,
                  borderRightColor: theme.border
                }}>
                  <div className="flex items-center justify-between">
                    <span>Product Type</span>
                    <ArrowUpDown size={14} style={{ color: theme.text.secondary }} />
                  </div>
                </th>
                <th className="text-sm font-medium border-r p-3 text-left" style={{ 
                  color: theme.text.primary,
                  borderRightColor: theme.border
                }}>
                  <div className="flex items-center justify-between">
                    <span>Security (3/50)</span>
                    <ArrowUpDown size={14} style={{ color: theme.text.secondary }} />
                  </div>
                </th>
                <th className="text-sm font-medium w-20 border-r p-3 text-left" style={{ 
                  color: theme.text.primary,
                  borderRightColor: theme.border
                }}>
                  <div className="flex items-center justify-between">
                    <span>Qty.</span>
                    <ArrowUpDown size={14} style={{ color: theme.text.secondary }} />
                  </div>
                </th>
                <th className="text-sm font-medium w-36 border-r p-3 text-left" style={{ 
                  color: theme.text.primary,
                  borderRightColor: theme.border
                }}>
                  <div className="flex items-center justify-between">
                    <span>Price</span>
                    <ArrowUpDown size={14} style={{ color: theme.text.secondary }} />
                  </div>
                </th>
                <th className="text-sm font-medium w-20 border-r p-3 text-left" style={{ 
                  color: theme.text.primary,
                  borderRightColor: theme.border
                }}>
                  <div className="flex items-center justify-between">
                    <span>Type</span>
                    <ArrowUpDown size={14} style={{ color: theme.text.secondary }} />
                  </div>
                </th>
                <th className="text-sm font-medium w-36 p-3 text-left" style={{ color: theme.text.primary }}>
                  <div className="flex items-center justify-between">
                    <span>Margin Req</span>
                    <ArrowUpDown size={14} style={{ color: theme.text.secondary }} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: theme.background }}>
              {items.map((item, i) => (
                <tr 
                  key={i} 
                  className="h-10 border-b" 
                  style={{ 
                    borderBottomColor: theme.border,
                    backgroundColor: theme.background
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme.hover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = theme.background;
                  }}
                >
                  <td className="text-sm border-r text-center p-3" style={{ 
                    borderRightColor: theme.border,
                    color: theme.text.secondary
                  }}>
                    {item.type}
                  </td>
                  <td className="text-sm border-r p-3" style={{ borderRightColor: theme.border }}>
                    <div className="flex items-center justify-between">
                      <span style={{ color: theme.text.secondary }}>{item.security}</span>
                      <button>
                        <svg className="w-4 h-4" style={{ color: theme.text.secondary }} viewBox="0 0 24 24" fill="none">
                          <circle cx="5" cy="12" r="1" fill="currentColor" />
                          <circle cx="12" cy="12" r="1" fill="currentColor" />
                          <circle cx="19" cy="12" r="1" fill="currentColor" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="text-sm border-r text-center p-3" style={{ 
                    borderRightColor: theme.border,
                    color: theme.text.secondary
                  }}>
                    {item.qty}
                  </td>
                  <td className="text-sm border-r text-right pr-8 p-3" style={{ 
                    borderRightColor: theme.border,
                    color: theme.text.secondary
                  }}>
                    ₹{item.price.toFixed(2)}
                  </td>
                  <td className="border-r text-center p-3" style={{ borderRightColor: theme.border }}>
                    <span className="text-xs px-3 py-0.5 rounded" style={{
                      backgroundColor: theme.surface,
                      color: '#22c55e',
                      border: `1px solid ${theme.border}`
                    }}>
                      BUY
                    </span>
                  </td>
                  <td className="text-sm text-right pr-8 p-3" style={{ color: theme.text.secondary }}>
                    ₹{item.margin.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer - Border top and bottom */}
        <div className="mt-6 pt-4 border-t" style={{ borderTopColor: theme.border }}>
          <div className="flex justify-between">
            <div className="flex">
              {/* Margin Required */}
              <div className="mr-8">
                <div className="text-sm mb-[6px]" style={{ color: theme.text.secondary }}>Margin Required</div>
                <div className="text-base font-medium" style={{ color: theme.text.primary }}>₹5,908.00</div>
              </div>
              
              {/* Final Margin with Checkbox Below */}
              <div>
                <div>
                  <div className="flex items-center mb-[6px] gap-1">
                    <div className="text-sm" style={{ color: theme.text.secondary }}>Final Margin</div>
                    <Info size={16} style={{ color: theme.text.secondary }} />
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="text-base font-medium text-green-400">
                      ₹5,90,478.00
                    </div>
                    <button className="hover:opacity-70">
                      <RefreshCw className="w-4 h-4" style={{ color: theme.text.secondary }} />
                    </button>
                  </div>
                </div>
                
                {/* Checkbox below final margin */}
                <div className="flex items-center gap-2 mt-2">
                  <Checkbox
                    id="include-positions"
                    checked={includeExisting}
                    onCheckedChange={(checked) => setIncludeExisting(!!checked)}
                    className="w-4 h-4 rounded-sm data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    style={{ borderColor: theme.border }}
                  />
                  <label
                    htmlFor="include-positions"
                    className="text-xs"
                    style={{ color: theme.text.secondary }}
                  >
                    Include existing positions
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setOpen(false)}
                className="px-6 py-2 text-sm font-medium rounded"
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
              </button>
              <button
                onClick={() => setOpen(false)}
                className="px-6 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600"
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