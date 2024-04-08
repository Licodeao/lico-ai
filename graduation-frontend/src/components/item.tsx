import { useState, type FC, type ReactNode, useEffect } from "react";
import PlusSvg from "@/assets/img/plus.svg";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";

interface IProps {
  children?: ReactNode;
  name: string;
  description: string;
  totalCount: number;
}

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <LinearProgress
      variant="determinate"
      {...props}
      sx={{
        borderRadius: "20px",
        width: "100%",
      }}
    />
  );
}

const UsageItem: FC<IProps> = ({ name, description, totalCount }) => {
  const [progress, setProgress] = useState(0);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((prevProgress) =>
  //       prevProgress >= totalCount ? 0 : prevProgress + 1
  //     );
  //   }, 800);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  return (
    <div className="bg-[#2D2F2F] rounded-lg w-[300px] h-[200px] flex flex-col justify-between items-center p-4">
      <div className="w-full flex flex-row justify-between items-center">
        <span className="text-semibold text-md">{name}</span>

        <img
          src={PlusSvg}
          alt="plus"
          style={{
            width: "15px",
            height: "15px",
          }}
        />
      </div>

      <div className="w-full flex flex-col gap-3">
        <div className="flex flex-row justify-between items-center">
          <span className="text-[#9E9F9F] text-sm">{description}</span>
          <div>
            {progress / 10} / {totalCount}
          </div>
        </div>

        <LinearProgressWithLabel value={progress / 10} variant="determinate" />
      </div>
    </div>
  );
};

export default UsageItem;
