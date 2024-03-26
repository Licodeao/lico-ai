import type { FC, ReactNode } from "react";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface IProps {
  children?: ReactNode;
}

const HistoryItem: FC<IProps> = () => {
  return (
    <div className="bg-[#2C2C2C] w-56 h-16 flex flex-row justify-around items-center rounded-md cursor-pointer hover:bg-[#202020]">
      <ScheduleIcon fontSize="small" />
      <div className="w-1/2 overflow-hidden text-ellipsis text-sm">
        HistoryItemName
      </div>
      <ChevronRightIcon fontSize="medium" />
    </div>
  );
};

export default HistoryItem;
