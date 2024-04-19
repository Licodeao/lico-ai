import { FC, useEffect, useRef, useState } from "react";
import { WaveCanvas } from "./waveCanvas";
import {
  drawBackground,
  drawRuler,
  drawPointer,
  getLength,
  getGap,
  clamp,
  getBegin,
} from "../common/painter";
import { Col, InputNumber, Row, Slider } from "antd";
import { useSize } from "ahooks";
import { getCanvasMousePosition } from "../common/utils";
import { useForceUpdate } from "../common/useForce";

export interface Props {
  currentTime?: number;
  duration?: number;
  backgroundColor?: string;
  pointerWidth?: number;
  pointerColor?: string;
  click?: Function;
  url?: string;
}

export const Track: FC<Props> = ({
  currentTime = 0,
  duration = 10,
  backgroundColor = "#529393",
  pointerWidth = 2,
  pointerColor = "white",
  click,
}) => {
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

  // ratio
  const [ratio, setRatio] = useState(1);

  const $canvas = (waveCanvas: any) => {
    if (waveCanvas !== null) {
      setWaveCanvas(waveCanvas);
    }
  };

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
      click?.(time);
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
      color: pointerColor,
      pointerWidth,
    });
  };

  return (
    <div className="w-full h-full relative overflow-scroll" ref={containerRef}>
      <div className="fixed bottom-0 right-0 h-[30px]">
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
      </div>
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
  );
};
