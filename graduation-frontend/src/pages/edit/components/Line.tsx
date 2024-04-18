import { CanvasContext } from "@/utils/context";
import { useContext, type FC, type ReactNode } from "react";

interface IProps {
  children?: ReactNode;
  style: any;
}

const Line: FC<IProps> = ({ style }) => {
  const canvasContext = useContext(CanvasContext);

  const { width, height } = style;

  return (
    <>
      <div
        className="z-[9999] absolute bg-blue-500 h-[2px]"
        style={{ width, top: -2 }}
      />
      <div
        className="z-[9999] absolute bg-blue-500 h-[2px]"
        style={{ width, top: height }}
      />

      <div
        className="z-[9999] absolute bg-blue-500 w-[2px]"
        style={{ height: height + 4, top: -2, left: -2 }}
      />
      <div
        className="z-[9999] absolute bg-blue-500 w-[2px]"
        style={{ height: height + 4, top: -2, left: width }}
      />
    </>
  );
};

export default Line;
