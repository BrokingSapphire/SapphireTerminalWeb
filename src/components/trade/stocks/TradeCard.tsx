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
    <div className="border border-border dark:border-dark-border rounded-lg bg-surface dark:bg-[#121413] w-[1050px] p-6 max-[550px]:w-full max-[550px]:p-4">
      {/* Header Section */}
      <div className="h-[30px] mb-[26px] max-[550px]:h-auto max-[550px]:mb-4">
        <div className="float-left max-[550px]:float-none max-[550px]:w-full max-[550px]:mb-2">
          <div className="inline-block mr-2">
            <Image src="/globe.svg" alt="Stock" width={24} height={24} />
          </div>
          <div className="inline-block text-base font-normal text-[#1A1A1A] dark:text-dark-lighttext mr-2 max-[550px]:text-sm">
            {`${symbol} ${date} FUT`}
          </div>
          <div
            className={`inline-block text-xs font-semibold px-2 py-0.5 rounded ${
              type === "BUY"
                ? "bg-[#E5FFDC] text-[#34A853]"
                : "bg-red-100 text-red-700"
            }`}
          >
            {type}
          </div>
        </div>
        <div className="float-right max-[550px]:float-none max-[550px]:w-full max-[550px]:flex max-[550px]:justify-between">
          <span className="text-lg font-normal text-[#1A1A1A] dark:text-dark-lighttext max-[550px]:text-base">
            ₹{price.toLocaleString("en-IN")}
          </span>
          <span
            className={`text-xs ml-2 ${
              percentChange >= 0 ? "text-[#34A853]" : "text-red-500"
            }`}
          >
            {percentChange >= 0 ? "+" : ""}
            {percentChange.toFixed(2)}%
          </span>
        </div>
        <div className="clear-both max-[550px]:clear-none"></div>
      </div>

      {/* Trade Details Grid */}
      <div className="mb-4 max-[550px]:grid max-[550px]:grid-cols-2 max-[550px]:gap-2">
        <div className="inline-block w-[160px] mr-3 mb-4 align-top max-[550px]:w-auto max-[550px]:mr-0">
          <div className="text-sm text-[#4B5563] dark:text-dark-graytext">Entry Price</div>
          <div className="mt-1 text-base font-normal text-[#1A1A1A] dark:text-dark-lighttext">
            {entryPrice.toFixed(2)}
          </div>
        </div>
        <div className="inline-block w-[160px] mr-3 mb-4 align-top max-[550px]:w-auto max-[550px]:mr-0">
          <div className="text-sm text-[#4B5563] dark:text-dark-graytext">Entry Range</div>
          <div className="mt-1 text-base font-normal text-[#1A1A1A] dark:text-dark-lighttext">
            {entryRange}
          </div>
        </div>
        <div className="inline-block w-[160px] mr-3 mb-4 align-top max-[550px]:w-auto max-[550px]:mr-0">
          <div className="text-sm text-[#4B5563] dark:text-dark-graytext">Stoploss</div>
          <div className="mt-1 text-base font-normal text-[#1A1A1A] dark:text-dark-lighttext">
            {stoploss}
          </div>
        </div>
        <div className="inline-block w-[160px] mr-3 mb-4 align-top max-[550px]:w-auto max-[550px]:mr-0">
          <div className="text-sm text-[#4B5563] dark:text-dark-graytext">Target</div>
          <div className="mt-1 text-base font-normal text-[#1A1A1A] dark:text-dark-lighttext">
            {target.toLocaleString("en-IN")}
          </div>
        </div>
        <div className="inline-block w-[160px] mr-3 mb-4 align-top max-[550px]:w-auto max-[550px]:mr-0">
          <div className="text-sm text-[#4B5563] dark:text-dark-graytext">Quantity</div>
          <div className="mt-1 text-base font-normal text-[#1A1A1A] dark:text-dark-lighttext">
            {quantity}
          </div>
        </div>
        <div className="inline-block w-[160px] mr-3 mb-4 align-top max-[550px]:w-auto max-[550px]:mr-0">
          <div className="text-sm text-[#4B5563] dark:text-dark-graytext">Risk/Reward Ratio</div>
          <div className="mt-1 text-base font-normal text-[#1A1A1A] dark:text-dark-lighttext">
            {riskRewardRatio}
          </div>
        </div>
      </div>

      {/* Margin Required Section */}
      <div className="text-center border-t-[0.5px] py-2 dark:border-t-dark-border text-xs">
        <span className="text-[#4B5563] dark:text-dark-graytext mt-2">
          Margin required:
        </span>
        <span className="font-normal mt-2 ml-2 text-[#1A1A1A] dark:text-dark-lighttext">
          ₹{marginRequired.toLocaleString("en-IN")}
        </span>
        <Image
          src="/info.svg"
          alt="Info"
          width={16}
          height={16}
          className="ml-1 mt-2 text-gray-400 inline"
        />
      </div>

      {/* Button Section */}
      <div className="pt-3">
        <button
          className="bg-white dark:bg-[#23232399] text-center rounded border border-border dark:border-dark-border text-[#1A1A1A] dark:text-[#6B7280] py-2 w-[180px] text-sm mr-12 max-[550px]:w-full max-[550px]:mr-0 max-[550px]:mb-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          About Trade
        </button>
        <button className="bg-[#00C853] text-white py-2 rounded w-[180px] text-sm mr-12 max-[550px]:w-full max-[550px]:mr-0 max-[550px]:mb-2">
          Place Order
          <ArrowRight className="ml-2 inline" size={18} />
        </button>
        <button
          className="text-gray-400 p-2 max-[550px]:w-full"
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

      {/* Show Gain Info Section */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          showGainInfo ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        {netGain && (
          <div className="bg-[#B8DBD94D] dark:bg-[#23232399] p-3 text-xs rounded text-[#1A1A1A] dark:text-dark-lighttext">
            <div>{`Net Gain: ${netGain}`}</div>
          </div>
        )}

        <div className="mt-2 text-xs">
          {postedOn && (
            <span className="text-[#4B5563] dark:text-dark-graytext mr-6 max-[550px]:mr-4">
              Posted on:{" "}
              <span className="text-[#1A1A1A] dark:text-dark-lighttext font-medium">
                {postedOn}
              </span>
            </span>
          )}
          {postedBy && (
            <span className="text-[#4B5563] dark:text-dark-graytext mr-6 max-[550px]:mr-4">
              Posted by:{" "}
              <span className="text-[#1A1A1A] dark:text-dark-lighttext font-medium">
                {postedBy}
              </span>
            </span>
          )}
          {adviceId && (
            <span className="text-[#4B5563] dark:text-dark-graytext">
              Advice ID:{" "}
              <span className="text-[#1A1A1A] dark:text-dark-lighttext font-medium">
                {adviceId}
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TradeCard;