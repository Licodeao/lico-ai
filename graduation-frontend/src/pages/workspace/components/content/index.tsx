import type { FC, ReactNode } from "react";
import RightArrow from "@/assets/img/right-arrow.svg";
import OperationHistory from "../history";
interface IProps {
  children?: ReactNode;
}

const WorkSpaceContent: FC<IProps> = () => {
  return (
    <div className="w-screen h-screen flex-6 py-4 px-8 flex flex-col gap-12">
      <div className="flex flex-row justify-around items-center w-1/5 h-24 bg-[#2C2C2C] px-6 py-5 rounded-lg cursor-pointer hover:bg-[#202020]">
        <div className="flex flex-col gap-2">
          <div className="text-[17px] font-medium">创建属于你的 AI 视频</div>
          <div className="text-[10px] font-medium text-[#969696]">
            从头开始玩出花样儿 👻
          </div>
        </div>

        <img src={RightArrow} alt="right-arrow" />
      </div>
      <OperationHistory />
    </div>
  );
};

export default WorkSpaceContent;
