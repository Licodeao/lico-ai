import type { FC, ReactNode } from "react";
import HistoryItem from "../historyItem";

import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

interface IProps {
  children?: ReactNode;
}

const OperationHistory: FC<IProps> = () => {
  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row justify-start items-center gap-2">
          <ManageHistoryIcon />
          <span className="text-[#CBCBCB] text-[16px] font-medium">
            创建历史
          </span>
        </div>
        <div className="text-[#CBCBCB] text-[14px] font-medium flex items-center cursor-pointer">
          查看更多
          <ArrowRightAltIcon />
        </div>
      </div>
      <HistoryItem />
    </div>
  );
};

export default OperationHistory;
