import type { FC, ReactNode } from "react";
import CanvasHeader from "./header";

interface IProps {
  children?: ReactNode;
}

const Canvas: FC<IProps> = () => {
  return (
    <div className="w-full h-full flex-1 bg-[#F7F7F8] flex flex-col">
      <CanvasHeader />
      <div className="flex-1">Canvas</div>
    </div>
  );
};

export default Canvas;
