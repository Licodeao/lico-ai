import type { FC, ReactNode } from "react";
import AvatarImage from "@/assets/img/avatar.png";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CameraSvg from "@/assets/img/camera.svg";
import RecordAudioSvg from "@/assets/img/record-audio.svg";
import ScreenSvg from "@/assets/img/screen.svg";
import CameraScreenSvg from "@/assets/img/camera-screen.svg";
interface IProps {
  children?: ReactNode;
}

const EditRecord: FC<IProps> = () => {
  return (
    <div className="p-6 flex flex-col gap-8 font-semibold text-[#1A2033]">
      <span className="text-[18px]">录制</span>
      <div className="flex flex-col gap-8">
        <div className="flex flex-row justify-start items-center bg-[#9D70B1] rounded-lg gap-4">
          <img src={AvatarImage} alt="aiAvatar" />
          <div className="flex flex-col gap-2">
            <span className="text-sm text-white">不想自己上镜?</span>
            <div className="text-xs font-normal text-white flex justify-center items-center gap-1">
              <span>试一试 AI 角色吧</span>
              <ArrowRightAltIcon />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-3">
          <div className="bg-[#EEEEF0] flex flex-col justify-center items-center font-normal rounded-lg gap-4 p-5 hover:bg-[#E1E1E3]">
            <img src={CameraSvg} alt="camera" />
            相机
          </div>
          <div className="bg-[#EEEEF0] flex flex-col justify-center items-center font-normal rounded-lg gap-4 p-5 hover:bg-[#E1E1E3]">
            <img src={RecordAudioSvg} alt="audio" />
            音频
          </div>
          <div className="bg-[#EEEEF0] flex flex-col justify-center items-center font-normal rounded-lg gap-4 p-5 hover:bg-[#E1E1E3]">
            <img src={ScreenSvg} alt="screen" />
            屏幕共享
          </div>
          <div className="bg-[#EEEEF0] flex flex-col justify-center items-center font-normal rounded-lg gap-4 p-5 hover:bg-[#E1E1E3]">
            <img src={CameraScreenSvg} alt="camera-screen" />
            共享录制
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRecord;
