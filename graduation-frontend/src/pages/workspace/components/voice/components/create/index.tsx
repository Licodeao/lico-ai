import type { FC, ReactNode } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import AISvg from "@/assets/img/ai.svg";
interface IProps {
  children?: ReactNode;
}

const CreateVoice: FC<IProps> = () => {
  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex flex-col justify-start items-start gap-2">
        <span className="text-[18px]">创建数字克隆</span>
        <span className="text-xs text-[#A0A0A0]">
          在这里进行录音，将你的声音变成各种花样 👻
        </span>
      </div>

      <div className="w-full h-[100px] bg-black rounded-lg flex flex-row justify-start items-center gap-3">
        <div className="flex flex-row justify-start items-center gap-3 ml-5">
          <AccountCircleIcon
            sx={{
              color: "#2E7AFB",
              bgcolor: "#FFFFFF",
              borderRadius: "999px",
              fontSize: "70px",
            }}
          />

          <PlayCircleIcon
            sx={{
              fontSize: "40px",
            }}
          />
          <PauseCircleIcon
            sx={{
              fontSize: "40px",
            }}
          />
        </div>
      </div>

      <div>开始克隆转换</div>

      <div className="w-full h-[100px] bg-black rounded-lg flex flex-row justify-start items-center gap-3">
        <div className="flex flex-row justify-start items-center gap-3 ml-5">
          <img src={AISvg} alt="ai" className="text-[40px] text-white" />
          <PlayCircleIcon
            sx={{
              fontSize: "40px",
            }}
          />
          <PauseCircleIcon
            sx={{
              fontSize: "40px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateVoice;
