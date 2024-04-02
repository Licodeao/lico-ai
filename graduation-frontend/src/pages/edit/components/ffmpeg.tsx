import { useState, type FC, type ReactNode } from "react";
import PauseSvg from "@/assets/img/pause.svg";
// import PlaySvg from "@/assets/img/start.svg";
import SkipNextSvg from "@/assets/img/skip-next.svg";
import SkipBackSvg from "@/assets/img/skip-back.svg";
import VoiceoverSvg from "@/assets/img/voiceover.svg";
import SplitSvg from "@/assets/img/split.svg";
import ZoomInSvg from "@/assets/img/zoom-in.svg";
import ZoomOutSvg from "@/assets/img/zoom-out.svg";
import TimelineSetting from "@/assets/img/timeline-setting.svg";
import Slider from "@mui/material/Slider";
interface IProps {
  children?: ReactNode;
}

const Ffmpeg: FC<IProps> = () => {
  const [sliderValue, setSliderValue] = useState<number>(0);
  return (
    <div className="w-full h-40 border-t-[1px] border-t-[#E1E1E3] bg-[#FFFFFF] flex flex-col">
      <div className="w-full h-14 flex flex-row justify-between items-center px-4">
        <div className="flex flex-row justify-center items-center gap-2">
          <div className="flex flex-row justify-center items-center gap-2 p-2 rounded-lg hover:bg-[#F7F7F8] hover:cursor-pointer">
            <img src={SplitSvg} alt="split" />
            <span className="text-[#18191B] text-sm">切割</span>
          </div>
          <div className="flex flex-row justify-center items-center gap-2 p-2 rounded-lg hover:bg-[#F7F7F8] hover:cursor-pointer">
            <img src={VoiceoverSvg} alt="voiceover" />
            <span className="text-[#18191B] text-sm">画外音</span>
          </div>
        </div>
        <div className="w-1/2 flex-1 flex flex-row justify-center items-center gap-3">
          <div className="flex flex-row justify-center items-center gap-2">
            <img
              src={SkipBackSvg}
              alt="skip-back"
              className="bg-[#F7F7F8] rounded-full p-1 hover:bg-[#EEEEF0] hover:cursor-pointer"
            />
            <img
              src={PauseSvg}
              alt="pause"
              className="bg-[#F7F7F8] rounded-full p-2 hover:bg-[#EEEEF0] hover:cursor-pointer"
            />
            {/* <img src={PlaySvg} alt="play" /> */}
            <img
              src={SkipNextSvg}
              alt="skip-next"
              className="bg-[#F7F7F8] rounded-full p-1 hover:bg-[#EEEEF0] hover:cursor-pointer"
            />
          </div>
          <div className="flex flex-row justify-center items-center gap-2">
            <div className="text-xs">00:00.0</div>
            <span className="text-xs">/</span>
            <div className="text-xs">00:00.0</div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-4">
          <div className="flex flex-row justify-center items-center gap-8">
            <div className="p-2 rounded-lg hover:bg-[#F7F7F8] hover:cursor-pointer">
              <img src={ZoomOutSvg} alt="zoom-out" />
            </div>
            <Slider
              value={sliderValue}
              sx={{
                width: "100px",
              }}
              size="small"
            />
            <div className="p-2 rounded-lg hover:bg-[#F7F7F8] hover:cursor-pointer">
              <img src={ZoomInSvg} alt="zoom-in" />
            </div>
          </div>
          <div className="border-[0.5px] border-[#E1E1E3] h-6" />
          <div className="p-2 rounded-lg hover:bg-[#F7F7F8] hover:cursor-pointer">
            <img src={TimelineSetting} alt="setting" />
          </div>
        </div>
      </div>
      <div className="flex-1 bg-black">Timeline</div>
    </div>
  );
};

export default Ffmpeg;
