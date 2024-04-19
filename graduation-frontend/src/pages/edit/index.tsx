import { useEffect, useRef, useState, type FC, type ReactNode } from "react";
import Nav from "./components/nav";
import Operator from "./components/operator";
import Canvas from "./components/canvas";
import { useNavigate } from "react-router-dom";
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
// import { Track } from "./components/Track/index";
import { WaveCanvas } from "./components/Track/waveCanvas";
import {
  drawBackground,
  drawRuler,
  drawPointer,
  getLength,
  getGap,
  clamp,
  getBegin,
} from "./components/common/painter";
// import { Col, InputNumber, Row, Slider } from "antd";
import { useSize } from "ahooks";
import { getCanvasMousePosition } from "./components/common/utils";
import { useForceUpdate } from "./components/common/useForce";
interface IProps {
  children?: ReactNode;
}

const Edit: FC<IProps> = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(0);
  const [url, setSrc] = useState("");
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const [duration, setDuration] = useState(10);
  const backgroundColor = "#529393";

  // ratio
  const [ratio, setRatio] = useState(1);

  const $canvas = (waveCanvas: any) => {
    if (waveCanvas !== null) {
      setWaveCanvas(waveCanvas);
    }
  };

  const onClick = (time: number) => {
    if (!playerRef.current) {
      console.error("onClick no playerRef");
      setCurrentTime(time);
      return;
    }
    playerRef.current.pause();
    playerRef.current.currentTime = time;
  };

  useEffect(() => {
    if (
      window.location.pathname === "/edit" ||
      window.location.pathname === "/edit/"
    ) {
      navigate("/edit/setting", { replace: true });
    }
  }, [navigate]);

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
    setRatio(newValue as unknown as any);
  };

  const handleZoomOutChange = () => {
    if (sliderValue < 0) {
      setSliderValue(0);
    }
    setSliderValue(sliderValue - 1);
    setRatio(ratio - 1);
  };

  const handleZoomInChange = () => {
    if (sliderValue > 100) {
      setSliderValue(100);
    }
    setSliderValue(sliderValue + 1);
    setRatio(ratio + 1);
  };

  const forceUpdate = useForceUpdate();

  const durationRef = useRef(duration);
  useEffect(() => {
    durationRef.current = duration;
    forceUpdate();
  }, [duration]);

  // track canvas
  const [waveCanvas, setWaveCanvas] = useState<HTMLCanvasElement | null>(null);

  // canvas container
  const $shwave = useRef<HTMLDivElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const containerSize = useSize(containerRef);

  // compute time
  const computeTimeFromEvent = (event: MouseEvent | any) => {
    if (!waveCanvas || !$shwave.current) {
      return 0;
    }

    // 偏移的宽度
    const { x: left } = getCanvasMousePosition(waveCanvas, event);
    const { clientWidth: width } = waveCanvas; // canvas 实际宽度
    const length = getLength(durationRef.current); // 总长度
    const gap = getGap(width, length); // 0.1 s 所占用的像素宽度

    const begin = getBegin(currentTime, durationRef.current);
    // left 在 时间中的位置
    const time = clamp(
      left / gap / 10 + begin,
      begin,
      begin + durationRef.current
    );
    // console.log('clientWidth', width, 'length', length, 'gap', gap, 'left', left, 'begin', begin, 'time', time);
    return time;
  };

  // get time, then reDraw
  const onCanvasClick = (event: MouseEvent) => {
    const time = computeTimeFromEvent(event);
    if (currentTime !== time) {
      onClick?.(time);
    }
  };

  // click event
  useEffect(() => {
    if (waveCanvas === null) {
      return;
    }
    //设置canvas点击监听
    waveCanvas.addEventListener("click", onCanvasClick);
    return () => {
      waveCanvas.removeEventListener("click", onCanvasClick);
    };
  }, [waveCanvas]);

  // set container width
  useEffect(() => {
    if (!containerSize || !containerRef.current || !$shwave.current) {
      return;
    }
    const { width: containerWidth } = containerSize;
    containerRef.current.style.width = `${containerWidth}px`;
  }, [containerSize]);

  const draw = () => {
    const ctx = waveCanvas && waveCanvas?.getContext("2d");
    if (!waveCanvas || !ctx || !containerSize || !$shwave.current) return;

    // // set canvas width, 否则会出现模糊情况
    // ctx.imageSmoothingEnabled = false;
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Window/devicePixelRatio

    const { width: containerWidth, height: containerHeight } = containerSize;
    waveCanvas.width = containerWidth * ratio;
    waveCanvas.height = containerHeight;

    $shwave.current.style.width = `${waveCanvas.width}px`;

    //绘制背景
    drawBackground(waveCanvas, ctx, backgroundColor);

    // 刻度尺
    drawRuler(waveCanvas, ctx, 1, durationRef.current);

    // 时间指针
    drawPointer({
      canvas: waveCanvas,
      ctx,
      pixelRatio: 1,
      duration,
      currentTime,
      color: "white",
      pointerWidth: 2,
    });
  };

  return (
    <div className="w-screen h-screen flex flex-row items-center text-[#5C5E65]">
      <Nav />
      <div className="w-full h-full flex flex-col overflow-hidden">
        <div className="flex-1 flex">
          <Operator />
          <Canvas
            playerRef={playerRef}
            setCurrentTime={setCurrentTime}
            url={
              "http://su.bcebos.com/v1/creative-brain-hd/multimedia/9F0A0EFAF98045C997DE417C256AAD78/creation_1713448131827_961.mp4?authorization=bce-auth-v1%2FALTAKPxUA3jj8b35CQnomxZGQN%2F2024-04-18T13%3A48%3A52Z%2F604800%2F%2Fcd2cc608b84beae2276455f157d3478222f7a45252275ae278a5612d0dc30763"
            }
            setDuration={setDuration}
          />
        </div>

        {/** FFmpeg */}
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
                  onClick={() => (playerRef.current!.currentTime! -= 2)}
                />

                <div
                  className="bg-[#F7F7F8] rounded-full p-2 hover:bg-[#EEEEF0] hover:cursor-pointer"
                  onClick={() => dispatch(changeIsPlayAction(!isPlay))}
                >
                  {isPlay ? (
                    <img
                      src={PauseSvg}
                      alt="pause"
                      onClick={() => playerRef.current?.pause()}
                    />
                  ) : (
                    <img
                      src={PlaySvg}
                      alt="play"
                      onClick={() => playerRef.current?.play()}
                    />
                  )}
                </div>
                <img
                  src={SkipNextSvg}
                  alt="skip-next"
                  className="bg-[#F7F7F8] rounded-full p-1 hover:bg-[#EEEEF0] hover:cursor-pointer"
                  onClick={() => (playerRef.current!.currentTime! += 2)}
                />
              </div>
              <div className="flex flex-row justify-center items-center gap-2">
                <div className="text-xs">
                  {Math.floor(currentTime).toFixed(2)}
                </div>
                <span className="text-xs">/</span>
                <div className="text-xs">
                  {Math.floor(duration % 60).toFixed(2)}
                </div>
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
          <div className="flex-1 bg-[#ffffff]">
            {/* <Track
              click={onClick}
              currentTime={currentTime}
              duration={duration}
            /> */}
            <div
              className="w-full h-full relative overflow-scroll"
              ref={containerRef}
            >
              {/* <div className="fixed bottom-0 right-0 h-[30px]">
                <Row className="pl-[10px]">
                  <Col span={5}>
                    <Slider
                      min={1}
                      max={20}
                      onChange={(value: number) => setRatio(value)}
                      value={ratio}
                      step={0.1}
                    />
                  </Col>
                  <Col span={8}>
                    <InputNumber
                      min={1}
                      max={20}
                      style={{ margin: "0 16px" }}
                      step={0.1}
                      value={ratio}
                      onChange={(value: number | null) => setRatio(value || 1)}
                    />
                  </Col>
                </Row>
              </div> */}
              <div ref={$shwave} className="h-calc(100% - 30px) min-w-full">
                <WaveCanvas
                  $canvas={$canvas}
                  waveCanvas={waveCanvas}
                  draw={draw}
                  currentTime={currentTime}
                  duration={duration}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
