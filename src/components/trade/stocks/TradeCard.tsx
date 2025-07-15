import React from "react";
import Image from "next/image";
import { ChevronRight, Info, ArrowRight, ChevronDown } from "lucide-react";

interface TradeCardProps {
  symbol: string;
  date: string;
  type: string;
  price: number;
  percentChange: number;
  entryPrice: number;
  entryRange: string;
  stoploss?: string;
  target: number;
  quantity: number;
  riskRewardRatio: string;
  marginRequired: number;
  netGain?: string;
  postedOn?: string;
  postedBy?: string;
  adviceId?: string;
}

const TradeCard: React.FC<TradeCardProps> = ({
  symbol,
  date,
  type,
  price,
  percentChange,
  entryPrice,
  entryRange,
  stoploss = "...",
  target,
  quantity,
  riskRewardRatio,
  marginRequired,
  netGain,
  postedOn,
  postedBy,
  adviceId,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [showGainInfo, setShowGainInfo] = React.useState(false);

  return (
    <div className="border border-border dark:border-dark-border rounded-lg p-4 sm:p-6 bg-surface dark:bg-[#121413]">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-[26px]">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Image src="/globe.svg" alt="Stock" width={24} height={24} />
          <div className="text-sm sm:text-base font-normal truncate dark:text-dark-lighttext">{`${symbol} ${date} FUT`}</div>
          <div
            className={`text-xs font-semibold px-2 py-0.5 rounded ${
              type === "BUY"
                ? "bg-[#E5FFDC] text-[#34A853]"
                : "bg-red-100 text-red-700"
            }`}
          >
            {type}
          </div>
        </div>
        <div className="flex items-center mt-2 sm:mt-0 sm:ml-auto w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-base sm:text-lg font-normal">
            ₹{price.toLocaleString("en-IN")}
          </span>
          <span
            className={`text-xs ml-2 ${
              percentChange >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {percentChange >= 0 ? "+" : ""}
            {percentChange.toFixed(2)}%
          </span>
        </div>
      </div>

      {/* Trade Details Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 text-xs mb-4">
        <div>
          <span className="text-sm text-text dark:text-dark-graytext">
            Entry Price
          </span>
          <div className="mt-1 text-base font-normal dark:text-dark-lighttext">
            {entryPrice.toFixed(2)}
          </div>
        </div>
        <div>
          <span className="text-sm text-text dark:text-dark-graytext">
            Entry Range
          </span>
          <div className="mt-1 text-base font-normal dark:text-dark-lighttext">
            {entryRange}
          </div>
        </div>
        <div>
          <span className="text-sm text-text dark:text-dark-graytext">
            Stoploss
          </span>
          <div className="mt-1 text-base font-normal dark:text-dark-lighttext">
            {stoploss}
          </div>
        </div>
        <div>
          <span className="text-sm text-text dark:text-dark-graytext">
            Target
          </span>
          <div className="mt-1 text-base font-normal dark:text-dark-lighttext">
            {target.toLocaleString("en-IN")}
          </div>
        </div>
        <div>
          <span className="text-sm text-text dark:text-dark-graytext">
            Quantity
          </span>
          <div className="mt-1 text-base font-normal dark:text-dark-lighttext">
            {quantity}
          </div>
        </div>
        <div>
          <span className="text-sm text-text dark:text-dark-graytext">
            Risk/Reward Ratio
          </span>
          <div className="mt-1 text-base font-normal dark:text-dark-lighttext">
            {riskRewardRatio}
          </div>
        </div>
      </div>

      {/* Margin Required Section */}
      <div className="flex items-center justify-center border-t-[0.5px] py-2 dark:border-t-dark-border text-xs">
        <span className="text-text dark:text-dark-graytext mt-2">
          Margin required:{" "}
        </span>
        <span className="font-normal mt-2 ml-2 dark:text-dark-lighttext">
          ₹{marginRequired.toLocaleString("en-IN")}
        </span>
        {/* <Info size={14} className="ml-1 mt-2 text-gray-400" /> */}
        <Image
          src="/info.svg"
          alt="Info"
          width={16}
          height={16}
          className="ml-1 mt-2 text-gray-400"
        />
      </div>

      {/* Button Section */}
      <div className="flex items-center gap-10 pt-3">
        <button
          className="bg-white dark:bg-[#23232399] text-center rounded border border-border dark:border-dark-border text-text dark:text-[#6B7280] py-2 flex-1 text-sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          About Trade
        </button>
        <button className="bg-[#00C853] text-white py-2 rounded flex items-center justify-center flex-1 text-sm">
          Place Order <ArrowRight className="ml-2" size={18} />
        </button>
        <button
          className="text-gray-400 p-2"
          onClick={() => setShowGainInfo(!showGainInfo)}
        >
          {showGainInfo ? (
            <ChevronRight
              size={18}
              className="transform -rotate-90 dark:text-[#D1D5DB]"
            />
          ) : (
            <ChevronDown size={18} className="dark:text-[#D1D5DB]" />
          )}
        </button>
      </div>

      {/* Show Gain Info Section (only visible when dropdown button is clicked) */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          showGainInfo ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        {/* Net Gain Section */}
        {netGain && (
          <div className="bg-[#B8DBD94D] dark:bg-[#23232399] p-3 text-xs rounded dark:text-dark-lighttext">
            <div>{`Net Gain: ${netGain}`}</div>
          </div>
        )}

        {/* Posted Information */}
        <div className="flex gap-x-6 sm:gap-4 text-gray-500 dark:text-dark-graytext mt-2 text-xs">
          {postedOn && (
            <div>
              Posted on:{" "}
              <span className="text-[#1A1A1A] dark:text-dark-lighttext font-medium">
                {postedOn}
              </span>
            </div>
          )}
          {postedBy && (
            <div>
              Posted by:{" "}
              <span className="text-[#1A1A1A] dark:text-dark-lighttext font-medium">
                {postedBy}
              </span>
            </div>
          )}
          {adviceId && (
            <div>
              Advice ID:{" "}
              <span className="text-[#1A1A1A] dark:text-dark-lighttext font-medium">
                {adviceId}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TradeCard;