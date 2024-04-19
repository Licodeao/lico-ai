import { useCanvasData } from "@/store/modules/hook";
import React, { useEffect } from "react";

interface IVideoPlayer {
  url: string;
  playerRef: React.MutableRefObject<HTMLVideoElement | null>;
  setCurrentTime: Function;
  setDuration: Function;
}

export const VideoPlayer = ({
  playerRef: videoRef,
  setDuration,
  url,
  setCurrentTime,
}: IVideoPlayer) => {
  const canvasData = useCanvasData();
  // TODO: controls 的 时间显示有问题，保留到了整数，这个后面需要处理一下。
  useEffect(() => {
    if (!videoRef.current) {
      return;
    }
    videoRef.current.ontimeupdate = () => {
      setCurrentTime?.(videoRef.current?.currentTime);
    };
    videoRef.current.addEventListener("canplay", () => {
      setDuration?.(videoRef.current?.duration);
    });
  }, [url]);

  return (
    <div
      id="center"
      style={{
        ...canvasData.style,
      }}
    >
      <video
        // controls
        muted
        src={url}
        ref={videoRef}
      ></video>
    </div>
  );
};
