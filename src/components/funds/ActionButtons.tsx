import React from "react";
import { ChevronRight } from "lucide-react";

interface ActionButtonsProps {
  onNavigate: (section: "main" | "deposit" | "withdraw") => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onNavigate }) => {
  return (
    <div className="flex justify-end pr-3 w-full whitespace-nowrap max-w-[80vw] mx-auto text-xs">
      <div className="flex items-center gap-3 whitespace-nowrap">
        <button
          onClick={() => onNavigate("withdraw")}
          className="py-2 px-5 border border-green-500 dark:border-[#22a06b] text-green-600 rounded-md bg-[#D1FADF4D] dark:bg-[#4b5555] hover:bg-green-100 transition-colors text-xs dark:text-[#ffffff]"
          style={{ width: "120px" }}
        >
          Withdraw
        </button>

        <button
          onClick={() => onNavigate("deposit")}
          className="py-2 px-5 bg-green-500 dark:text-[#ffffff] text-white rounded-md hover:bg-green-600 dark:bg-[#1db954] dark:border-[#d1d5db] transition-colors text-xs"
          style={{ width: "120px" }}
        >
          Deposit
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;