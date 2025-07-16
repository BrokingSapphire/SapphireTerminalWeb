"use client";
import React, { useState, useCallback, useMemo } from "react";
import {
  Download,
  Search,
  MoreVertical,
  ArrowUpDown,
  MoreHorizontal,
} from "lucide-react";
import DownloadButton from "@/components/gen-components/DownloadButton";
import SearchButton from "@/components/gen-components/SearchButton";
import HoldingSelector from "@/components/holdings/HoldingSelector";

// TypeScript interfaces
interface PortfolioSummary {
  investmentValue: number;
  currentValue: number;
  dailyPL: {
    value: number;
    percentage: number;
  };
  netPL: {
    value: number;
    percentage: number;
  };
}

interface StockHolding {
  security: string;
  quantity: number;
  avgPrice: number;
  ltp: number;
  investmentValue: number;
  netPL: {
    value: number;
    percentage: number;
  };
  dailyPL: {
    value: number;
    percentage: number;
  };
}

interface PLValue {
  value: number;
  percentage: number;
}

type SortField =
  | "security"
  | "quantity"
  | "avgPrice"
  | "ltp"
  | "investmentValue"
  | "netPL"
  | "dailyPL";
type SortDirection = "asc" | "desc";

const EquityHoldings = () => {
  // Initial portfolio data
  const [portfolioSummary] = useState({
    investmentValue: 49561.8,
    currentValue: 24780.9,
    dailyPL: {
      value: 4780.9,
      percentage: 8.79,
    },
    netPL: {
      value: -2478.8,
      percentage: -3.67,
    },
  });

  const initialHoldings: StockHolding[] = [
    {
      security: "MRF",
      quantity: 500,
      avgPrice: 2042.63,
      ltp: 46780.0,
      investmentValue: 2042.63,
      netPL: {
        value: 2042.63,
        percentage: 24.7,
      },
      dailyPL: {
        value: 5673.79,
        percentage: 24.7,
      },
    },
    {
      security: "TATASTEEL",
      quantity: 274,
      avgPrice: 822.1,
      ltp: 46780.0,
      investmentValue: 2042.63,
      netPL: {
        value: 2042.63,
        percentage: -24.7,
      },
      dailyPL: {
        value: 5673.79,
        percentage: 24.7,
      },
    },
    {
      security: "ITC",
      quantity: 2910,
      avgPrice: 192281.63,
      ltp: 46780.0,
      investmentValue: 2042.63,
      netPL: {
        value: 2042.63,
        percentage: 24.7,
      },
      dailyPL: {
        value: 5673.79,
        percentage: 24.7,
      },
    },
    {
      security: "MOTILALOSWAL",
      quantity: 190,
      avgPrice: 87.42,
      ltp: 46780.0,
      investmentValue: 2042.63,
      netPL: {
        value: 2042.63,
        percentage: 24.7,
      },
      dailyPL: {
        value: 5673.79,
        percentage: 24.7,
      },
    },
    {
      security: "WIPRO",
      quantity: 575,
      avgPrice: 923.42,
      ltp: 46780.0,
      investmentValue: 2042.63,
      netPL: {
        value: 2042.63,
        percentage: -24.7,
      },
      dailyPL: {
        value: 5673.79,
        percentage: 24.7,
      },
    },
  ];

  // Sorting state
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [hoveredHeader, setHoveredHeader] = useState<SortField | null>(null);

  // Format currency values
  const formatCurrency = (value: any) => {
    return value.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  };

  // Format percentage values
  const formatPercentage = (value: any) => {
    return `(${value.toFixed(2)}%)`;
  };

  // Sort handler
  const handleSort = useCallback(
    (field: SortField) => {
      if (sortField === field) {
        // If same field clicked
        if (sortDirection === "asc") {
          // Change to descending
          setSortDirection("desc");
        } else {
          // Reset to unsorted
          setSortField(null);
          setSortDirection("asc");
        }
      } else {
        // New field, default to ascending
        setSortField(field);
        setSortDirection("asc");
      }
    },
    [sortField, sortDirection]
  );

  // Sorted holdings
  const sortedHoldings = useMemo(() => {
    if (!sortField) return initialHoldings;

    return [...initialHoldings].sort((a, b) => {
      let valueA, valueB;

      if (sortField === "netPL" || sortField === "dailyPL") {
        valueA = a[sortField].value;
        valueB = b[sortField].value;
      } else {
        valueA = a[sortField];
        valueB = b[sortField];
      }

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortDirection === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return sortDirection === "asc"
        ? (valueA as number) - (valueB as number)
        : (valueB as number) - (valueA as number);
    });
  }, [initialHoldings, sortField, sortDirection]);

  // Calculate total values
  const totalInvestmentValue = initialHoldings.reduce(
    (sum, holding) => sum + holding.investmentValue,
    0
  );
  const totalNetPL = {
    value: initialHoldings.reduce(
      (sum, holding) => sum + holding.netPL.value,
      0
    ),
    percentage: -24.7, // This would normally be calculated
  };
  const totalDailyPL = {
    value: initialHoldings.reduce(
      (sum, holding) => sum + holding.dailyPL.value,
      0
    ),
    percentage: 24.7, // This would normally be calculated
  };

  // Header cell component with sort logic
  const HeaderCell = ({
    field,
    label,
    className = "",
    width = "",
  }: {
    field: SortField;
    label: string;
    className?: string;
    width?: string;
  }) => {
    const isActive = sortField === field;

    return (
      <th
        className={`px-2 py-0 text-left text-xs font-normal border-r border-gray-200 dark:border-[#2f2f2f] cursor-pointer ${className} 
          ${isActive ? "bg-[#E8E8F0] dark:bg-[#1c1c1c]" : "bg-[#F4F4F9] dark:bg-[#1c1c1c]"}
          hover:bg-gray-100 dark:hover:bg-transparent`}
        onClick={() => handleSort(field)}
        onMouseEnter={() => setHoveredHeader(field)}
        onMouseLeave={() => setHoveredHeader(null)}
        style={{ width }}
      >
        <div className="flex items-center justify-between">
          <span>{label}</span>
          <ArrowUpDown
            className={`w-3 h-3 ml-1 ${
              hoveredHeader === field || isActive ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </th>
    );
  };

  // Search state
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="w-full">
      <HoldingSelector />
      {/* Summary Section */}
      <div className="grid grid-cols-4 bg-[#F4F4F9] dark:bg-[#1c1c1c] mb-2 h-16 overflow-hidden border border-[#D1D5DB] dark:border-[#2F2F2F] rounded-md">
        <div className="flex flex-col justify-center h-full px-1.5 relative text-center">
          <div className="text-xs text-gray-600 dark:text-[#c9cacc] text-center">
            Investment Value
          </div>
          <div className="font-normal text-sm text-center text-black dark:text-[#ebeef5]">
            {formatCurrency(portfolioSummary.investmentValue)}
          </div>
          <div className="absolute right-0 top-3 h-3/5 w-px bg-[#D1D5DB] dark:bg-[#2f2f2f]"></div>
        </div>
        <div className="flex flex-col justify-center h-full px-1.5 relative text-center">
          <div className="text-xs text-gray-600 dark:text-[#c9cacc] text-center">
            Current Value
          </div>
          <div className="font-normal text-sm text-center text-black dark:text-[#ebeef5]">
            {formatCurrency(portfolioSummary.currentValue)}
          </div>
          <div className="absolute right-0 top-3 h-3/5 w-px bg-[#D1D5DB] dark:bg-[#2f2f2f]"></div>
        </div>
        <div className="flex flex-col justify-center h-full px-1.5 relative text-center">
          <div className="text-xs text-gray-600 dark:text-[#c9cacc] text-center">Daily P&L</div>
          <div className="font-normal text-sm text-center text-[#22A06B] dark:text-green-400">
            {formatCurrency(portfolioSummary.dailyPL.value)}{" "}
            <span className="text-[#22A06B] dark:text-[#22a06b] text-xs">
              {formatPercentage(portfolioSummary.dailyPL.percentage)}
            </span>
          </div>
          <div className="absolute right-0 top-3 h-3/5 w-px bg-[#D1D5DB] dark:bg-[#2f2f2f]"></div>
        </div>
        <div className="flex flex-col justify-center h-full px-1.5 text-center">
          <div className="text-xs text-gray-600 dark:text-[#c9cacc] text-center">Net P&L</div>
          <div className="font-normal text-sm text-center text-red-500 dark:text-[#e53935]">
            {formatCurrency(portfolioSummary.netPL.value)}{" "}
            <span className="text-red-500 dark:text-red-400 text-xs">
              {formatPercentage(portfolioSummary.netPL.percentage)}
            </span>
          </div>
        </div>
      </div>

      {/* Equity Section */}
      <div className="mb-2">
        <div className="flex justify-between items-center mb-3 mt-4">
          <h2 className="text-sm font-normal text-black dark:text-[#ebeef5]">Equity (5)</h2>
          <div className="flex items-center gap-2">
            <div
              className={`relative flex items-center transition-all duration-200 overflow-hidden`}
              style={{ width: searchExpanded ? 192 : 32 }}
            >
              <button
                onClick={() => setSearchExpanded(true)}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center z-10"
                aria-label="Expand search"
                tabIndex={searchExpanded ? -1 : 0}
                style={{ pointerEvents: searchExpanded ? 'none' : 'auto' }}
              >
                <SearchButton />
              </button>
              <input
                type="text"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                onBlur={() => setSearchExpanded(false)}
                autoFocus={searchExpanded}
                className={`pl-9 pr-2 py-2 border border-gray-300 dark:border-[#23272F] rounded-lg text-sm text-[#686868] dark:text-[#F4F4F9] focus:outline-none focus:border-[#c9cacc] transition-all duration-200 bg-white dark:bg-[#23272F] ${searchExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                placeholder="Search..."
                style={{ width: searchExpanded ? 192 : 32, minWidth: 0 }}
              />
            </div>
            <DownloadButton />
          </div>
        </div>

        {/* Equity Table with vertical columns and divider lines */}
        <div className="overflow-x-auto border rounded-md border-gray-200 dark:border-[#2f2f2f] bg-white dark:bg-[#121212]">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-[#2f2f2f] bg-white dark:bg-[#121212]">
            <thead className="bg-[#F4F4F9] dark:bg-[#181A20] divide-x divide-gray-200 dark:divide-[#2f2f2f]">
              <tr className="bg-[#F4F4F9] dark:bg-[#181A20]" style={{ height: "42px" }}>
                <HeaderCell
                  field="security"
                  label="Security"
                  width="180px"
                  className="text-black dark:text-[#F4F4F9]"
                />
                <HeaderCell field="quantity" label="Qty" width="80px" className="text-black dark:text-[#F4F4F9]" />
                <HeaderCell field="avgPrice" label="Avg. Price" width="100px" className="text-black dark:text-[#F4F4F9]" />
                <HeaderCell field="ltp" label="LTP" width="100px" className="text-black dark:text-[#F4F4F9]" />
                <HeaderCell field="investmentValue" label="Investment Value" width="130px" className="text-black dark:text-[#F4F4F9]" />
                <HeaderCell field="netPL" label="Net P&L" width="120px" className="text-black dark:text-[#F4F4F9]" />
                <HeaderCell field="dailyPL" label="Daily P&L" width="120px" className="text-black dark:text-[#F4F4F9]" />
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-[#121212] divide-y divide-gray-200 dark:divide-[#2f2f2f]">
              {sortedHoldings.map((holding, index) => (
                <tr
                  key={index}
                  style={{ height: "32px" }}
                  className=""
                >
                  <td className="px-2 py-0 whitespace-nowrap border-r border-gray-200 dark:border-[#2f2f2f]">
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[#6B7280] dark:text-[#bcbdbf]"
                        style={{ fontSize: "11px" }}
                      >
                        {holding.security}
                      </span>
                      <MoreHorizontal
                        strokeWidth={2}
                        className="w-3 h-3 ml-1.5 rotate-90 text-gray-400 dark:text-[#c9cacc]"
                      />
                    </div>
                  </td>
                  <td
                    className="px-2 py-0 text-center text-[#6B7280] dark:text-[#bcbdbf] whitespace-nowrap border-r border-gray-200 dark:border-[#2f2f2f]"
                    style={{ fontSize: "11px" }}
                  >
                    {holding.quantity}
                  </td>
                  <td
                    className="px-2 py-0 text-center text-[#6B7280] dark:text-[#bcbdbf] whitespace-nowrap border-r border-gray-200 dark:border-[#2f2f2f]"
                    style={{ fontSize: "11px" }}
                  >
                    {formatCurrency(holding.avgPrice)}
                  </td>
                  <td
                    className="px-2 py-0 text-center text-[#6B7280] dark:text-[#bcbdbf] whitespace-nowrap border-r border-gray-200 dark:border-[#2f2f2f]"
                    style={{ fontSize: "11px" }}
                  >
                    {formatCurrency(holding.ltp)}
                  </td>
                  <td
                    className="px-2 py-0 text-center text-[#6B7280] dark:text-[#bcbdbf] border-r border-gray-200 dark:border-[#2f2f2f]"
                    style={{ fontSize: "11px" }}
                  >
                    {formatCurrency(holding.investmentValue)}
                  </td>
                  <td
                    className="px-2 py-0 text-center whitespace-nowrap border-r border-gray-200 dark:border-[#2f2f2f]"
                    style={{ fontSize: "11px" }}
                  >
                    <span
                      className={
                        holding.netPL.percentage < 0
                          ? "text-red-500 dark:text-[#e53935]"
                          : "text-[#22A06B] dark:text-[#22a06b]"
                      }
                    >
                      {formatCurrency(holding.netPL.value)}{" "}
                      {formatPercentage(holding.netPL.percentage)}
                    </span>
                  </td>
                  <td
                    className="px-2 py-0 text-center whitespace-nowrap border-gray-200 dark:border-[#2f2f2f]"
                    style={{ fontSize: "11px" }}
                  >
                    <span className="text-[#22A06B] dark:text-[#22a06b]">
                      {formatCurrency(holding.dailyPL.value)}{" "}
                      {formatPercentage(holding.dailyPL.percentage)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-[#F4F4F9] dark:bg-[#121212] font-medium border-t border-gray-200 dark:border-[#2f2f2f]" style={{ height: "32px" }}>
                <td
                  colSpan={4}
                  className="px-2 py-0 text-center whitespace-nowrap border-r text-[#bcbdbf] border-gray-200 dark:border-[#2f2f2f]"
                  style={{ fontSize: "11px" }}
                >
                  Total
                </td>
                <td
                  className="px-2 py-0 text-center text-[#6B7280] dark:text-[#C9CACC] whitespace-nowrap border-r border-gray-200 dark:border-[#2f2f2f]"
                  style={{ fontSize: "11px" }}
                >
                  {formatCurrency(totalInvestmentValue)}
                </td>
                <td
                  className="px-2 py-0 text-center whitespace-nowrap border-r border-gray-200 dark:border-[#2f2f2f]"
                  style={{ fontSize: "11px" }}
                >
                  <span className="text-red-500 dark:text-[#e53935]">
                    {formatCurrency(totalNetPL.value)}{" "}
                    {formatPercentage(totalNetPL.percentage)}
                  </span>
                </td>
                <td
                  className="px-2 py-0 text-center whitespace-nowrap border-gray-200 dark:border-[#2f2f2f]"
                  style={{ fontSize: "11px" }}
                >
                  <span className="text-[#22A06B] dark:text-[#22a06b]">
                    {formatCurrency(totalDailyPL.value)}{" "}
                    {formatPercentage(totalDailyPL.percentage)}
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EquityHoldings;