import { useState, type FC, type ReactNode } from "react";
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
import { useAppDispatch, useAppSelector } from "@/store/storeHook";
import { shallowEqual } from "react-redux";
import { changeIsPlayAction } from "@/store/modules/canvas";
interface IProps {
  children?: ReactNode;
}

const Ffmpeg: FC<IProps> = () => {
  const [sliderValue, setSliderValue] = useState<number>(0);
  const dispatch = useAppDispatch();
  const { isPlay } = useAppSelector(
    (state) => ({
      isPlay: state.canvas.isPlay,
    }),
    shallowEqual
  );

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number);
  };

  const handleZoomOutChange = () => {
    if (sliderValue < 0) {
      setSliderValue(0);
    }
    setSliderValue(sliderValue - 1);
  };

  const handleZoomInChange = () => {
    if (sliderValue > 100) {
      setSliderValue(100);
    }
    setSliderValue(sliderValue + 1);
  };

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

            <div
              className="bg-[#F7F7F8] rounded-full p-2 hover:bg-[#EEEEF0] hover:cursor-pointer"
              onClick={() => dispatch(changeIsPlayAction(!isPlay))}
            >
              {isPlay ? (
                <img src={PlaySvg} alt="play" />
              ) : (
                <img src={PauseSvg} alt="pause" />
              )}
            </div>
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
            <div
              className="p-2 rounded-lg hover:bg-[#F7F7F8] hover:cursor-pointer"
              onClick={handleZoomOutChange}
            >
              <img src={ZoomOutSvg} alt="zoom-out" />
            </div>
            <Slider
              value={sliderValue}
              sx={{
                width: "100px",
              }}
              size="small"
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
            />
            <div
              className="p-2 rounded-lg hover:bg-[#F7F7F8] hover:cursor-pointer"
              onClick={handleZoomInChange}
            >
              <img src={ZoomInSvg} alt="zoom-in" />
            </div>
          </div>
          <div className="border-[0.5px] border-[#E1E1E3] h-6" />
          <div className="p-2 rounded-lg hover:bg-[#F7F7F8] hover:cursor-pointer">
            <img src={TimelineSetting} alt="setting" />
          </div>
        </div>
      </div>
      <div className="flex-1 bg-black">
        <canvas
          style={{
            height: "100%",
            width: "100%",
            zIndex: 0,
            pointerEvents: "auto",
          }}
        />
      </div>
    </div>
  );
};

export default Ffmpeg;
