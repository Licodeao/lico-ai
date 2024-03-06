import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";

const VideoComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const video = document.getElementById("registerVideo") as HTMLElement;

    if (!video) return;

    const handleLoaded = () => {
      console.log("视频加载完毕");
      setIsLoading(true);
    };

    const handleError = () => {
      console.log("视频加载出错");
      setIsLoading(false);
    };

    video?.addEventListener("loadeddata", handleLoaded);
    video?.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("loadeddata", handleLoaded);
      video.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <div>
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            id="registerVideo"
          >
            <source
              src="https://typora-licodeao.oss-cn-guangzhou.aliyuncs.com/typoraImg/vedio.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      ) : (
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            height: "100%",
          }}
        />
      )}
    </>
  );
};

export default VideoComponent;
