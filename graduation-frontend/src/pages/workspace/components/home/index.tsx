import type { FC, ReactNode } from "react";
import OperationHistory from "../history";
import Exports from "../exports";

import RightArrow from "@/assets/img/right-arrow.svg";
import { useNavigate } from "react-router-dom";

interface IProps {
  children?: ReactNode;
}

const WorkspaceHome: FC<IProps> = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="flex flex-row justify-around items-center w-1/6 h-24 bg-[#2C2C2C] rounded-lg cursor-pointer hover:bg-[#202020]"
        onClick={() => navigate("/workspace/copilot")}
      >
        <div className="flex flex-col gap-2">
          <div className="text-[17px] font-medium">创建属于你的 AI 视频</div>
          <div className="text-[10px] font-medium text-[#969696]">
            从头开始玩出花样儿 👻
          </div>
        </div>

        <img src={RightArrow} alt="right-arrow" />
      </div>
      <div>
        <OperationHistory />
      </div>
      <div className="flex-1">
        <Exports />
      </div>
    </>
  );
};

export default WorkspaceHome;
