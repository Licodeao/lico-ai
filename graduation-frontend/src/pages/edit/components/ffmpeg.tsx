import type { FC, ReactNode } from "react";
import PauseSvg from "@/assets/img/pause.svg";
import PlaySvg from "@/assets/img/start.svg";
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
  return (
    <div className="w-full h-40 border-t-[1px] border-t-[#E1E1E3] bg-[#FFFFFF] flex flex-col">
      <div className="w-full h-14 flex flex-row justify-between items-center">
        <div className="flex flex-row justify-center items-center gap-2">
          <div>
            <img src={SplitSvg} alt="split" />
            <span>切割</span>
          </div>
          <div>
            <img src={VoiceoverSvg} alt="voiceover" />
            <span>录音</span>
          </div>
        </div>
        <div className="w-1/2 flex-1 flex flex-row justify-center items-center gap-2">
          <div>
            <img src={SkipBackSvg} alt="skip-back" />
            <img src={PauseSvg} alt="pause" />
            {/* <img src={PlaySvg} alt="play" /> */}
            <img src={SkipNextSvg} alt="skip-next" />
          </div>
          <div>
            <div>00:00.0</div>
            <span>/</span>
            <div>00:00.0</div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <div>
            <img src={ZoomOutSvg} alt="zoom-out" />
            <Slider />
            <img src={ZoomInSvg} alt="zoom-in" />
          </div>
          <div>|</div>
          <div>
            <img src={TimelineSetting} alt="setting" />
          </div>
        </div>
      </div>
      <div className="flex-1 bg-black">Timeline</div>
    </div>
  );
};

export default Ffmpeg;
