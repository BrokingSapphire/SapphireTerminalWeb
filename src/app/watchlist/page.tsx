//@ts-nocheck
"use client"
import React, { useEffect, useState, useRef } from "react";
import dynamic from 'next/dynamic';

// Dynamically import useTheme to avoid SSR issues
const useTheme = dynamic(() => import('@/context/ThemeContext').then(mod => ({ default: mod.useTheme })), {
  ssr: false,
  loading: () => null
});

// Declare global TradingView type
declare global {
  interface Window {
    TradingView: any;
    Datafeeds: any;
  }
}

function Watchlist() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [widgetKey, setWidgetKey] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const widgetRef = useRef(null);
  const themeHook = useTheme?.();

  // Handle mounting and theme detection
  useEffect(() => {
    setIsMounted(true);
    
    // Detect system theme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateTheme = () => {
      if (themeHook?.isDarkMode !== undefined) {
        setIsDarkMode(themeHook.isDarkMode);
      } else {
        setIsDarkMode(mediaQuery.matches);
      }
    };
    
    updateTheme();
    mediaQuery.addEventListener('change', updateTheme);
    
    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, [themeHook?.isDarkMode]);

  // Check if TradingView scripts are loaded
  useEffect(() => {
    const checkScripts = () => {
      if (typeof window !== 'undefined' && window.TradingView && window.Datafeeds) {
        setIsScriptLoaded(true);
      } else {
        // Try to load TradingView library if not present
        console.warn('TradingView library not found. Please ensure charting_library is properly loaded.');
        setTimeout(checkScripts, 1000); // Retry after 1 second
      }
    };
    
    if (isMounted) {
      checkScripts();
    }
  }, [isMounted]);

  // Force widget recreation when theme changes
  useEffect(() => {
    if (isMounted && isScriptLoaded) {
      setWidgetKey(prev => prev + 1);
    }
  }, [isDarkMode, isMounted, isScriptLoaded]);

  // Widget initialization effect
  useEffect(() => {
    if (!isMounted || !isScriptLoaded) return;

    // Cleanup existing widget
    const container = document.getElementById("chartContainer");
    if (!container) return;

    // Clear container completely
    container.innerHTML = '';
    
    // Force DOM reflow
    container.style.display = 'none';
    container.offsetHeight;
    container.style.display = 'block';

    // Remove existing widget reference
    if (widgetRef.current) {
      try {
        if (typeof widgetRef.current.remove === 'function') {
          widgetRef.current.remove();
        }
      } catch (e) {
        console.log('Widget cleanup error:', e);
      }
      widgetRef.current = null;
    }

    // Create widget with delay for stability
    const timer = setTimeout(() => {
      try {
        if (!window.TradingView || !window.Datafeeds) {
          console.error('TradingView or Datafeeds not available');
          return;
        }

        console.log('Creating TradingView widget with theme:', isDarkMode ? 'dark' : 'light');

        const widget = new window.TradingView.widget({
          container: "chartContainer",
          locale: "en",
          library_path: "charting_library/",
          datafeed: new window.Datafeeds.UDFCompatibleDatafeed(
            "https://demo-feed-data.tradingview.com"
          ),
          symbol: "AAPL",
          interval: "1D",
          height: Math.max(window.innerHeight - 88, 400),
          width: "100%",
          debug: false,
          
          // Theme configuration - this sets the overall theme
          theme: isDarkMode ? "dark" : "light",
          
          // Disable only specific conflicting features, keep settings accessible
          disabled_features: [
            "chart_property_page_background", // Only disable background settings to prevent theme conflicts
            // Keep other settings available
          ],
          
          // Enable features for better control
          enabled_features: [
            "study_templates",
          ],
          
          // Auto-apply settings based on theme
          auto_save_delay: 5,
          
          // Comprehensive styling overrides that match system theme
          overrides: isDarkMode ? {
            // Dark theme settings
            "paneProperties.background": "#121212",
            "paneProperties.backgroundType": "solid", // Force solid background
            "paneProperties.backgroundGradientStartColor": "#121212",
            "paneProperties.backgroundGradientEndColor": "#121212",
            
            // Chart area backgrounds
            "mainSeriesProperties.background": "#121212",
            "chartProperties.background": "#121212",
            "chartProperties.backgroundType": "solid",
            "chartProperties.backgroundGradientStartColor": "#121212",
            "chartProperties.backgroundGradientEndColor": "#121212",
            
            // Grid lines - set to dark theme
            "paneProperties.vertGridProperties.color": "#2a2a2a",
            "paneProperties.horzGridProperties.color": "#2a2a2a",
            "paneProperties.vertGridProperties.style": 0, // Solid lines
            "paneProperties.horzGridProperties.style": 0, // Solid lines
            
            // Scales (price and time) - dark theme
            "scalesProperties.backgroundColor": "#121212",
            "scalesProperties.textColor": "#b3b3b3", // Light text for dark background
            "scalesProperties.lineColor": "#2a2a2a",
            "scalesProperties.fontSize": 11,
            "timeScale.backgroundColor": "#121212",
            "timeScale.textColor": "#b3b3b3",
            "timeScale.fontSize": 11,
            
            // Crosshair - dark theme
            "crossHairProperties.color": "#b3b3b3",
            "crossHairProperties.width": 1,
            "crossHairProperties.style": 2, // Dashed
            
            // Watermark - dark theme
            "symbolWatermarkProperties.color": "#2a2a2a",
            "symbolWatermarkProperties.transparency": 90,
            "symbolWatermarkProperties.horzAlign": "center",
            "symbolWatermarkProperties.vertAlign": "center",
            
            // Candlesticks - optimized for dark theme
            "mainSeriesProperties.candleStyle.upColor": "#00d4aa",
            "mainSeriesProperties.candleStyle.downColor": "#ff4976",
            "mainSeriesProperties.candleStyle.wickUpColor": "#00d4aa",
            "mainSeriesProperties.candleStyle.wickDownColor": "#ff4976",
            "mainSeriesProperties.candleStyle.borderUpColor": "#00d4aa",
            "mainSeriesProperties.candleStyle.borderDownColor": "#ff4976",
            
            // Price lines
            "mainSeriesProperties.priceLineColor": "#b3b3b3",
            "mainSeriesProperties.priceLineWidth": 1,
            
          } : {
            // Light theme settings
            "paneProperties.background": "#ffffff",
            "paneProperties.backgroundType": "solid", // Force solid background
            "paneProperties.backgroundGradientStartColor": "#ffffff",
            "paneProperties.backgroundGradientEndColor": "#ffffff",
            
            // Chart area backgrounds
            "mainSeriesProperties.background": "#ffffff",
            "chartProperties.background": "#ffffff",
            "chartProperties.backgroundType": "solid",
            "chartProperties.backgroundGradientStartColor": "#ffffff",
            "chartProperties.backgroundGradientEndColor": "#ffffff",
            
            // Grid lines - set to light theme
            "paneProperties.vertGridProperties.color": "#e1e1e1",
            "paneProperties.horzGridProperties.color": "#e1e1e1",
            "paneProperties.vertGridProperties.style": 0, // Solid lines
            "paneProperties.horzGridProperties.style": 0, // Solid lines
            
            // Scales (price and time) - light theme
            "scalesProperties.backgroundColor": "#ffffff",
            "scalesProperties.textColor": "#131722", // Dark text for light background
            "scalesProperties.lineColor": "#e1e1e1",
            "scalesProperties.fontSize": 11,
            "timeScale.backgroundColor": "#ffffff",
            "timeScale.textColor": "#131722",
            "timeScale.fontSize": 11,
            
            // Crosshair - light theme
            "crossHairProperties.color": "#9598a1",
            "crossHairProperties.width": 1,
            "crossHairProperties.style": 2, // Dashed
            
            // Watermark - light theme
            "symbolWatermarkProperties.color": "#e0e0e0",
            "symbolWatermarkProperties.transparency": 90,
            "symbolWatermarkProperties.horzAlign": "center",
            "symbolWatermarkProperties.vertAlign": "center",
            
            // Candlesticks - optimized for light theme
            "mainSeriesProperties.candleStyle.upColor": "#26a69a",
            "mainSeriesProperties.candleStyle.downColor": "#ef5350",
            "mainSeriesProperties.candleStyle.wickUpColor": "#26a69a",
            "mainSeriesProperties.candleStyle.wickDownColor": "#ef5350",
            "mainSeriesProperties.candleStyle.borderUpColor": "#26a69a",
            "mainSeriesProperties.candleStyle.borderDownColor": "#ef5350",
            
            // Price lines
            "mainSeriesProperties.priceLineColor": "#9598a1",
            "mainSeriesProperties.priceLineWidth": 1,
          },
          
          // Additional settings
          toolbar_bg: isDarkMode ? "#1a1a1a" : "#ffffff",
          loading_screen: {
            backgroundColor: isDarkMode ? "#121212" : "#ffffff",
            foregroundColor: isDarkMode ? "#b3b3b3" : "#131722"
          },
          auto_save_delay: 5,
          saved_data: null,
          
          // Studies overrides
          studies_overrides: {
            "volume.volume.color.0": isDarkMode ? "#ff4976" : "#ef5350",
            "volume.volume.color.1": isDarkMode ? "#00d4aa" : "#26a69a",
            "volume.volume.transparency": 50,
          },
        });

        // Store widget reference
        widgetRef.current = widget;

        // Additional styling after chart loads
        if (widget.onChartReady) {
          widget.onChartReady(() => {
            console.log('Chart ready - applying system theme settings');
            
            // Apply additional chart settings programmatically
            setTimeout(() => {
              try {
                // Get the chart object
                const chart = widget.activeChart();
                
                if (chart) {
                  // Apply system theme settings
                  const themeSettings = isDarkMode ? {
                    // Dark theme chart settings
                    "paneProperties.background": "#121212",
                    "scalesProperties.textColor": "#b3b3b3",
                    "scalesProperties.backgroundColor": "#121212",
                    "paneProperties.vertGridProperties.color": "#2a2a2a",
                    "paneProperties.horzGridProperties.color": "#2a2a2a",
                  } : {
                    // Light theme chart settings
                    "paneProperties.background": "#ffffff",
                    "scalesProperties.textColor": "#131722",
                    "scalesProperties.backgroundColor": "#ffffff", 
                    "paneProperties.vertGridProperties.color": "#e1e1e1",
                    "paneProperties.horzGridProperties.color": "#e1e1e1",
                  };
                  
                  // Apply the settings
                  chart.applyOverrides(themeSettings);
                  
                  console.log('System theme settings applied successfully');
                }
              } catch (error) {
                console.log('Error applying chart settings:', error);
              }
              
              // Force background color via CSS as backup
              const elements = document.querySelectorAll('#chartContainer canvas, #chartContainer > div');
              elements.forEach(el => {
                if (el.style) {
                  el.style.backgroundColor = isDarkMode ? '#121212' : '#ffffff';
                }
              });
            }, 1000); // Increased delay for more reliable application
          });
        }

      } catch (error) {
        console.error('Error creating TradingView widget:', error);
      }
    }, 300);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      if (widgetRef.current) {
        try {
          if (typeof widgetRef.current.remove === 'function') {
            widgetRef.current.remove();
          }
        } catch (e) {
          console.log('Cleanup error:', e);
        }
        widgetRef.current = null;
      }
    };
  }, [isDarkMode, isMounted, isScriptLoaded, widgetKey]);

  // Show loading state during SSR and initial load
  if (!isMounted || !isScriptLoaded) {
    return (
      <div className="px-[28px] py-[18px] bg-white dark:bg-[#121212] min-h-screen">
        <div className="w-full bg-white dark:bg-[#121212] rounded-lg overflow-hidden h-[600px] flex items-center justify-center border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
            <div className="text-gray-500 dark:text-gray-400">
              {!isMounted ? 'Initializing...' : 'Loading TradingView chart...'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-[28px] py-[18px] bg-white dark:bg-[#121212] min-h-screen transition-colors duration-200">
      <div 
        key={`chart-${widgetKey}`}
        className="w-full bg-white dark:bg-[#121212] rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200" 
        id="chartContainer"
        style={{ 
          minHeight: '600px',
          backgroundColor: isDarkMode ? '#121212' : '#ffffff'
        }}
      />
    </div>
  );
}

export default Watchlist;