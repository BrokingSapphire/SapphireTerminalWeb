// components/RecentTransactions.tsx
import React from "react";

interface Transaction {
  id: string;
  amount: number;
  date: string;
  status: "completed" | "processing" | "failed";
  statusText: string;
  cardLastDigits: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(Math.abs(value));
};

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
}) => {
  return (
    <div className="border border-gray-200 dark:border-[#2f2f2f] rounded-lg bg-white dark:bg-[#121212] mb-4 max-w-[80vw] mx-auto text-xs">
      <div className="mb-[6px] border-b border-gray-200 dark:border-[#2f2f2f]">
        <h2 className="text-gray-800 dark:text-[#ebeef5] font-medium text-lg p-3">Recent Transactions</h2>
      </div>

      <div>
        {transactions.map((transaction) => (
          <div key={transaction.id} className="border-b border-gray-200 dark:border-[#2f2f2f] py-3 mx-3">
            <div className="flex justify-between mb-2">
              <div className="text-xs text-gray-500 dark:text-[#ebeef5]">#{transaction.id}</div>
              <div
                className={`text-sm font-medium ${
                  transaction.amount < 0 ? "text-red-600 dark:text-[#ebeef5]" : "text-gray-800 dark:text-[#ebeef5]"
                }`}
              >
                {transaction.amount < 0 ? "-" : ""}₹
                {formatCurrency(transaction.amount)}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-600 dark:text-[#c9cacc]">
                  {transaction.date}
                </span>
                <span className="text-gray-400 dark:text-[#ebeef5]">•</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-[4px] ${
                    transaction.status === "completed"
                      ? "bg-[#deffd3] text-[#24813d]"
                      : transaction.status === "processing"
                      ? "bg-[#fff6dc] text-[#ffbf00]"
                      : "bg-[#ffe4dd] text-[#ff5252]"
                  }`}
                >
                  {transaction.statusText}
                </span>
              </div>

              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-red-500 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 17.5C14.2091 17.5 16 15.7091 16 13.5C16 11.2909 14.2091 9.5 12 9.5C9.79086 9.5 8 11.2909 8 13.5C8 15.7091 9.79086 17.5 12 17.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.5 7.5H16.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-xs text-gray-500 dark:text-[#c9cacc]">
                  ***** {transaction.cardLastDigits}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
