"use client";
import { useState, useRef, useEffect } from "react";

interface TradeSelectorProps {
  activeComponent: React.ReactNode;
  closedComponent: React.ReactNode;
}

function TradeSelector({ activeComponent, closedComponent }: TradeSelectorProps) {
  const [selected, setSelected] = useState<"active" | "closed">("active");
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const activeButtonRef = useRef<HTMLButtonElement>(null);
  const closedButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update the indicator position when selection changes
  useEffect(() => {
    const updateIndicator = () => {
      const currentButton = selected === "active" ? activeButtonRef.current : closedButtonRef.current;
      const container = containerRef.current;
      
      if (currentButton && container) {
        // Get the container's padding (4px = 1rem in most cases)
        const containerPadding = 4;
        
        // Calculate the button's position relative to container
        const buttonRect = currentButton.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // Calculate left position relative to container's content area
        const leftOffset = currentButton.offsetLeft;
        
        // Calculate top position to center the indicator vertically
        const topOffset = containerPadding;
        
        setIndicatorStyle({
          width: `${buttonRect.width}px`,
          height: `${buttonRect.height}px`,
          left: `${leftOffset}px`,
          top: `${topOffset}px`,
          position: 'absolute' as const
        });
      }
    };

    // Initial update
    updateIndicator();

    // Update on window resize with debounce
    let timeoutId: NodeJS.Timeout;
    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateIndicator, 100);
    };

    window.addEventListener('resize', debouncedUpdate);
    return () => {
      window.removeEventListener('resize', debouncedUpdate);
      clearTimeout(timeoutId);
    };
  }, [selected]);

  return (
    <div className="flex flex-col w-full mt-10">
      {/* Toggle Buttons */}
      <div 
        className="flex border border-[#D1D5DB] dark:border-[#2F2F2F] rounded-full p-1 w-full relative overflow-hidden" 
        ref={containerRef}
      >
        {/* Animated Indicator */}
        <div
          className="absolute bg-[#B8DBD94D] dark:bg-[#23232399] rounded-full transition-all duration-300 ease-in-out pointer-events-none"
          style={indicatorStyle}
        />
        
        <button
          ref={activeButtonRef}
          className={`flex-1 px-3 py-2 rounded-full text-xs font-medium transition-colors duration-300 z-10 relative min-w-0 sm:px-6 sm:py-3 sm:text-lg ${
            selected === "active"
              ? "text-[#1DB954]"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
          onClick={() => setSelected("active")}
        >
          <span className="block sm:hidden">Active</span>
          <span className="hidden sm:block">Active Trade</span>
        </button>
        
        <button
          ref={closedButtonRef}
          className={`flex-1 px-3 py-2 rounded-full text-xs font-medium transition-colors duration-300 z-10 relative min-w-0 sm:px-6 sm:py-3 sm:text-lg ${
            selected === "closed"
              ? "text-[#1DB954]"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
          onClick={() => setSelected("closed")}
        >
          <span className="block sm:hidden">Closed</span>
          <span className="hidden sm:block">Closed Trade</span>
        </button>
      </div>

      {/* Render Content Based on Selection */}
      <div className="mt-4 w-full sm:mt-6">
        {selected === "active" ? activeComponent : closedComponent}
      </div>
    </div>
  );
}

export default TradeSelector;