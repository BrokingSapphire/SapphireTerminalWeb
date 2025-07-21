"use client";

import React, { useState, useEffect } from "react";
import FundsSummaryCards from "@/components/funds/FundsSummaryCards";
import ActionButtons from "@/components/funds/ActionButtons";
import BalanceBreakdown from "@/components/funds/BalanceBreakdown";
import RecentTransactions from "@/components/funds/RecentTransactions";
import BalanceChart from "@/components/funds/BalanceChart";
import DepositPage from "@/components/funds/DepositPage";
import WithdrawPage from "@/components/funds/Withdraw";
// Import sample data - replace with API calls in production
import {
  fundsSummary,
  balanceBreakdown,
  pnlData,
  marginData,
  premiumData,
  withdrawableBalance,
  recentTransactions,
  chartData,
} from "@/constants/funds-data";

// Define Transaction interface that matches the one from RecentTransactions
interface RecentTransaction {
  id: string;
  amount: number;
  date: string;
  status: "processing" | "failed" | "completed";
  statusText: string;
  cardLastDigits: string;
}

// Define proper interfaces for margins and premiums to match BalanceBreakdown expectations
interface MarginData {
  spanMargin: number;
  exposureMargin: number;
  cncAmount: number;
  commodityAdditionalMargin: number;
  cashIntradayMTFMargin: number;
  coroMargin: number;
}

interface PremiumData {
  fnoOptionPremium: number;
  currencyPremium: number;
  commodityPremium: number;
  totalPremium: number;
}

export default function FundsPage() {
  const [activeSection, setActiveSection] = useState<
    "main" | "deposit" | "withdraw"
  >("main");

  const [screenWidth, setScreenWidth] = useState(800); // Default to desktop

  // Track screen width for responsive behavior
  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    
    // Initial check
    updateScreenWidth();
    
    // Add resize listener
    window.addEventListener('resize', updateScreenWidth);
    
    return () => window.removeEventListener('resize', updateScreenWidth);
  }, []);

  // Determine if mobile based on screen width
  const isMobile = screenWidth <= 550;

  // Replace with real API calls when integrating with backend
  const [summaryData] = useState(fundsSummary);
  const [balanceData] = useState(balanceBreakdown);
  const [profitLossData] = useState(pnlData);
  
  // Fix margin data structure to match expected interface
  const [margins] = useState<MarginData>({
    spanMargin: marginData.spanMargin || 0,
    exposureMargin: marginData.exposureMargin || 0,
    cncAmount: marginData.spanAddOn || 0, // Use spanAddOn for cncAmount
    commodityAdditionalMargin: marginData.commodityAdditionalMargin || 0,
    cashIntradayMTFMargin: marginData.cashIntradayMISMargin || 0, // Fixed: use the correct property name
    coroMargin: marginData.coroMargin || 0,
  });
  
  // Fix premium data structure to match expected interface
  const [premiums] = useState<PremiumData>({
    fnoOptionPremium: premiumData.optionPremium || 0, // Use optionPremium for fnoOptionPremium
    currencyPremium: premiumData.currencyPremium || 0,
    commodityPremium: premiumData.commodityPremium || 0,
    totalPremium: premiumData.totalPremium || 0,
  });
  
  const [withdrawable] = useState(withdrawableBalance);
  const [transactions] = useState<RecentTransaction[]>(
    recentTransactions as RecentTransaction[]
  );
  const [chartValues] = useState(chartData);

  // Calculate total balance for BalanceBreakdown component
  const totalBalance =
    balanceData.cashBalance +
    balanceData.collateralBalance +
    balanceData.collateralLiquidFunds;

  // Handle navigation between sections
  const handleNavigate = (section: "main" | "deposit" | "withdraw") => {
    setActiveSection(section);
  };

  // CSS styles object for responsive design
  const styles = {
    mainContainer: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column' as const,
      overflow: 'hidden', // Prevent main container from scrolling
      paddingBottom: '40px',
    },
    headerContainer: {
      flexShrink: 0,
      marginBottom: isMobile ? '8px' : '16px',
      width: '100%',
      zIndex: 10,
    },
    scrollableContent: {
      flex: 1,
      overflowY: 'auto' as const,
      overflowX: 'hidden' as const,
      // Remove height constraints that might be causing issues
      minHeight: 0, // Important for flex children
    },
    contentWrapper: {
      width: '100%',
      maxWidth: isMobile ? '100%' : '1050px',
      padding: isMobile ? '0 16px' : '0 24px',
      margin: '0 auto',
      // Remove minWidth that might cause horizontal scrolling
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: isMobile ? '16px' : '50px',
      paddingTop: isMobile ? '8px' : '12px',
      paddingBottom: isMobile ? '40px' : '60px', // Extra padding at bottom
      justifyContent: 'center',
      // Ensure grid doesn't constrain height
      minHeight: 'fit-content',
    },
    leftColumn: {
      width: '100%',
      minHeight: 'fit-content',
    },
    rightColumn: {
      width: '100%',
      minHeight: 'fit-content',
    },
  };

  // Render based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "deposit":
        return <DepositPage onBack={() => handleNavigate("main")} />;
        
      case "withdraw":
        return <WithdrawPage onBack={() => handleNavigate("main")} />;
        
      case "main":
      default:
        return (
          <>
            {/* Fixed Header - FundsSummaryCards */}
            <div style={styles.headerContainer}>
              <FundsSummaryCards data={summaryData} onNavigate={handleNavigate} />
            </div>

            {/* Scrollable Content */}
            <div 
              className="scrollbar-hide"
              style={styles.scrollableContent}
            >
              <div style={styles.contentWrapper}>
                <div style={styles.gridContainer}>
                  {/* Left Column - Balance Breakdown */}
                  <div style={styles.leftColumn}>
                    <BalanceBreakdown
                      balanceData={balanceData}
                      profitLossData={profitLossData}
                      margins={margins}
                      premiums={premiums}
                      withdrawable={withdrawable}
                      totalBalance={totalBalance}
                    />
                  </div>

                  {/* Right Column - Recent Transactions and Chart */}
                  <div style={styles.rightColumn}>
                    <RecentTransactions transactions={transactions} />
                    <BalanceChart data={chartValues} />
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div style={styles.mainContainer}>
      {renderContent()}
    </div>
  );
}