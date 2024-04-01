import type { FC, ReactNode } from "react";
import PrevIcon from "@/assets/img/prev.svg";
import NextIcon from "@/assets/img/next.svg";
import ClearAllIcon from "@/assets/img/clear-all.svg";
import DoneIcon from "@/assets/img/done.svg";
interface IProps {
  children?: ReactNode;
}

const CanvasHeader: FC<IProps> = () => {
  return (
    <div className="w-full h-[50px] flex flex-row justify-end items-center text-sm">
      <div className="flex flex-row justify-center items-center gap-4">
        <div className="flex flex-row justify-center items-center gap-2 p-2 rounded-lg hover:bg-[#E1E1E3]">
          <img src={PrevIcon} alt="prev" />
          <span>上一步</span>
        </div>
        <div className="flex flex-row justify-center items-center gap-2 p-2 rounded-lg hover:bg-[#E1E1E3]">
          <img src={NextIcon} alt="next" />
          <span>下一步</span>
        </div>
      </div>
      <div className="w-[1px] h-8 bg-[#DFE0E5] mx-2"></div>
      <div className="flex flex-row justify-center items-center gap-3 mr-3">
        <div className="flex flex-row justify-center items-center gap-2 p-2 rounded-lg bg-[#EEEEF0] hover:bg-[#E1E1E3]">
          <img src={ClearAllIcon} alt="clear" />
          <span className="text-[#18191B]">清空</span>
        </div>
        <div className="flex flex-row justify-center items-center gap-2 p-2 rounded-lg bg-[#1A2033] hover:shadow-lg">
          <span className="text-white">完成并保存</span>
          <img src={DoneIcon} alt="done" />
        </div>
      </div>
    </div>
  );
};

export default CanvasHeader;
