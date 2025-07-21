// components/BalanceBreakdown.tsx
import React from "react";
import { Info } from "lucide-react";

interface BalanceBreakdownProps {
  balanceData: {
    cashBalance: number;
    collateralBalance: number;
    collateralLiquidFunds: number;
    marginUtilised: number;
  };
  profitLossData: {
    realizedPL: number;
    unrealizedPL: number;
  };
  margins: {
    spanMargin: number;
    exposureMargin: number;
    cncAmount: number;
    commodityAdditionalMargin: number;
    cashIntradayMTFMargin: number;
    coroMargin: number;
  };
  premiums: {
    fnoOptionPremium: number;
    currencyPremium: number;
    commodityPremium: number;
    totalPremium: number;
  };
  withdrawable: number;
  totalBalance: number;
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-IN").format(value);
};

const BalanceBreakdown: React.FC<BalanceBreakdownProps> = ({
  balanceData,
  profitLossData,
  margins,
  premiums,
  withdrawable,
  totalBalance,
}) => {
  // Convert data to arrays for easier rendering
  const balanceItems = [
    { label: "Cash Balance", value: balanceData.cashBalance },
    { label: "Collateral Balance", value: balanceData.collateralBalance },
    {
      label: "Collateral (Liquid Funds)",
      value: balanceData.collateralLiquidFunds,
    },
  ];

  const profitLossItems = [
    { label: "Realized P&L", value: profitLossData.realizedPL },
    { label: "Unrealized P&L", value: profitLossData.unrealizedPL },
  ];

  const marginItems = [
    { label: "Span Margin", value: margins.spanMargin },
    { label: "Exposure Margin", value: margins.exposureMargin },
    { label: "CNC Amount", value: margins.cncAmount },
    {
      label: "Commodity Additional Margin",
      value: margins.commodityAdditionalMargin,
    },
    {
      label: "Cash Intraday / MTF Margin",
      value: margins.cashIntradayMTFMargin,
    },
    { label: "CORO Margin", value: margins.coroMargin },
  ];

  const premiumItems = [
    { label: "FNO Premium", value: premiums.fnoOptionPremium },
    { label: "Currency Premium", value: premiums.currencyPremium },
    { label: "Commodity Premium", value: premiums.commodityPremium },
    { label: "Total Premium", value: premiums.totalPremium },
  ];

  // Fixed table until 550px, then responsive
  const renderTable = (items: { label: string; value: number }[]) => (
    <div className="max-[550px]:overflow-x-auto">
      <table className="w-full text-sm dark:text-[#c9cacc] max-[550px]:min-w-[300px]">
        <tbody>
          {items.map((item, index) => (
            <tr
              key={item.label}
              className={index % 2 === 0 ? "bg-[#F4F4F9] dark:bg-[#1c1d1d]" : ""}
            >
              <td className="py-2 pl-[30px] max-[550px]:pl-4 text-[#6B7280] dark:text-[#c9cacc] text-[14px] max-[550px]:text-xs max-[550px]:break-words">
                {item.label}
              </td>
              <td className="py-2 pr-[30px] max-[550px]:pr-4 text-[#6B7280] dark:text-[#c9cacc] text-right text-[14px] max-[550px]:text-xs max-[550px]:whitespace-nowrap">
                ₹{formatCurrency(item.value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Fixed section header until 550px, then responsive
  const renderSectionHeader = (
    title: string,
    amount: number,
    isFirst: boolean = false
  ) => (
    <div
      className={`flex items-center max-[550px]:flex-wrap max-[550px]:gap-2 ${!isFirst ? "border-t pt-4" : ""}`}
    >
      <h2 className="text-base font-medium text-[#1DB954] max-[550px]:text-sm max-[550px]:flex max-[550px]:items-center">
        {title} <Info size={16} className="inline ml-1 text-gray-400" />
      </h2>
      <div className="ml-auto text-base font-medium text-[#1DB954] max-[550px]:text-sm max-[550px]:whitespace-nowrap">
        ₹{formatCurrency(amount)}
      </div>
    </div>
  );

  return (
    <div className="border border-gray-200 dark:border-[#2f2f2f] rounded-lg p-3 w-[500px] max-[550px]:w-full max-[550px]:max-w-full mx-auto text-xs overflow-x-auto"> 
      {/* Fixed header until 550px, then responsive */}
      <div className="flex items-center mb-3 max-[550px]:flex-wrap max-[550px]:gap-2">
        <h2 className="text-[#1DB954] dark:text-[#1db954] text-base font-medium flex items-center max-[550px]:text-sm">
          Total Balance <Info size={14} className="ml-1 text-gray-400 dark:text-[#c9cacc]" />
        </h2>
        <div className="ml-auto text-[#1DB954] font-medium text-base max-[550px]:text-sm max-[550px]:whitespace-nowrap">
          ₹{formatCurrency(totalBalance)}
        </div>
      </div>

      {/* Fixed main balance table until 550px, then responsive */}
      <div className="mb-4 max-[550px]:overflow-x-auto">
        <table className="w-full max-[550px]:min-w-[300px]">
          <tbody>
            <tr className="bg-gray-50 text-[#6B7380] text-sm max-[550px]:text-xs">
              <td className="py-2 px-3 bg-[#F4F4F9] dark:text-[#c9cacc] dark:bg-[#1c1d1d] pl-[30px] max-[550px]:pl-4 max-[550px]:break-words">
                Cash Balance
              </td>
              <td className="py-2 px-3 text-right bg-[#F4F4F9] dark:text-[#c9cacc] dark:bg-[#1c1d1d] pr-[30px] max-[550px]:pr-4 max-[550px]:whitespace-nowrap">
                ₹{formatCurrency(balanceData.cashBalance)}
              </td>
            </tr>
            <tr className="text-sm text-[#6B7380] dark:text-[#c9cacc] max-[550px]:text-xs">
              <td className="py-2 px-3 pl-[30px] max-[550px]:pl-4 max-[550px]:break-words">Collateral Balance</td>
              <td className="py-2 px-3 text-right pr-[30px] max-[550px]:pr-4 max-[550px]:whitespace-nowrap">
                ₹{formatCurrency(balanceData.collateralBalance)}
              </td>
            </tr>
            <tr className="bg-gray-50 text-[#6B7380] dark:text-[#c9cacc] text-sm max-[550px]:text-xs">
              <td className="py-2 px-3 bg-[#F4F4F9] pl-[30px] dark:bg-[#1c1d1d] max-[550px]:pl-4 max-[550px]:break-words">
                Collateral (Liquid Funds)
              </td>
              <td className="py-2 px-3 text-right bg-[#F4F4F9] pr-[30px] dark:bg-[#1c1d1d] max-[550px]:pr-4 max-[550px]:whitespace-nowrap">
                ₹{formatCurrency(balanceData.collateralLiquidFunds)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Fixed Margin Utilised Section */}
      {renderSectionHeader("Margin Utilised", balanceData.marginUtilised)}

      {/* Fixed sections until 550px, then responsive */}
      <div className="pt-2">
        <h3 className="text-sm font-normal mb-2 ml-[15px] max-[550px]:ml-2 max-[550px]:text-xs">P&L (Profit & Loss)</h3>
        {renderTable(profitLossItems)}
      </div>

      <div className="pt-2">
        <h3 className="text-sm font-normal mb-2 ml-[15px] max-[550px]:ml-2 max-[550px]:text-xs">Margin</h3>
        {renderTable(marginItems)}
      </div>

      <div className="pt-2">
        <h3 className="text-sm font-normal mb-2 ml-[15px] max-[550px]:ml-2 max-[550px]:text-xs">Premiums</h3>
        {renderTable(premiumItems)}
      </div>

      {/* Fixed Withdrawable Balance Section */}
      {renderSectionHeader("Withdrawable Balance", withdrawable)}
    </div>
  );
};

export default BalanceBreakdown;