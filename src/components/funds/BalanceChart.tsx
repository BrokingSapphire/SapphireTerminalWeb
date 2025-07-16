import React from 'react';

interface BalanceChartProps {
  data: {
    totalBalance: number;
    marginUtilized: number;
    marginUtilizedPercentage?: number;
  };
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(value);
};

const BalanceChart: React.FC<BalanceChartProps> = ({ data }) => {
  // Calculate the rotation for the gauge based on margin utilization percentage
  // Default to -60 degrees if the percentage is not provided or is 0
  const rotationDegree = data.marginUtilizedPercentage 
    ? -60 + (data.marginUtilizedPercentage * 180 / 100)
    : -60;

  return (
    // Nikhil
    <div className='border border-gray-200 dark:border-[#2f2f2f] mt-3 rounded-md max-w-[80vw] mx-auto text-xs'>
      <h2 className="text-lg border-b border-gray-200 dark:border-[#2f2f2f] text-[#121212] dark:text-[#ebeef5] font-medium p-3">Total Balance Breakup</h2>
      
      <div className="p-4">
        <div className="flex">
          {/* Left side - Semi-circular gauge */}
          <div className="flex-1">
            <div className="relative">
              {/* Semi-circular gauge */}
              <div className="w-36 h-20 mx-auto relative overflow-hidden">
                <div className="w-36 h-20 absolute top-0 left-0">
                  <div className="w-36 h-36 border-[24px] border-[#FBBC05] rounded-full"></div>
                </div>
                <div className="w-[88px] h-[88px] bg-white dark:bg-[#121212] rounded-full absolute top-[24px] left-[24px]"></div>
                <div className="w-36 h-18 bg-white dark:bg-[#121212] absolute bottom-0"></div>
              </div>
              
              {/* Margin Utilised text below gauge */}
              <div className="text-center mt-4">
                <div className="text-[#6B7280] dark:text-[#9CA3AF] text-sm">Margin Utilised</div>
                <div className="text-lg text-black dark:text-white">₹0.00</div>
              </div>
            </div>
          </div>
          
          {/* Right side - Legend */}
          <div className="flex-1">
            <div className="pt-3 ml-12">
              <div className="flex items-center mb-1">
                <div className="w-2 h-2 bg-[#FBBC05] rounded-full mr-2"></div>
                <span className="text-sm text-black dark:text-white">Total Balance</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#0F4C3A] rounded-full mr-2"></div>
                <span className="text-sm text-black dark:text-white">Margin Utilised</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceChart;