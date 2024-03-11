import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import videoSource from "@/assets/img/vedio.mp4";

const VideoComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <video className="w-full h-full object-cover" autoPlay muted loop>
          <source src={videoSource} type="video/mp4" />
        </video>
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
