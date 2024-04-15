import type { FC, ReactNode } from "react";
import addVoiceSvg from "@/assets/img/add-voice.svg";
import plusVoiceSvg from "@/assets/img/plus-voice.svg";
import { Outlet, useNavigate } from "react-router-dom";

interface IProps {
  children?: ReactNode;
}

const Voice: FC<IProps> = () => {
  const navigate = useNavigate();

  return (
    <div>
      {location.pathname === "/workspace/voice" ? (
        <div className="w-full h-full flex flex-col items-start gap-3">
          <div className="flex flex-col justify-start items-start gap-2">
            <span className="text-[18px]">数字声音</span>
            <span className="text-xs text-[#A0A0A0]">
              在这里上传你的录音，即可创造属于你的数字声音克隆 🔊
            </span>
          </div>

          <div
            className="w-64 h-40 bg-[#2C2D2F] rounded-lg flex justify-center items-center cursor-pointer"
            onClick={() => navigate("/workspace/voice/create")}
          >
            <div className="w-[240px] h-[130px] p-3 rounded-lg border-[0.5px] border-[#404142] flex flex-col justify-center items-center">
              <div className="flex flex-col justify-center items-center gap-2">
                <img src={addVoiceSvg} alt="add-voice" />
                <div className="flex flex-row justify-center items-center gap-1">
                  <img src={plusVoiceSvg} alt="plus-voice" />
                  <span className="text-sm text-[#5496FC]">添加录音</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Voice;
