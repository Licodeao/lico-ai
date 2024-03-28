import type { FC, ReactNode } from "react";
import CanvasHeader from "./header";

interface IProps {
  children?: ReactNode;
}

const Canvas: FC<IProps> = () => {
  return (
    <div className="w-full h-full flex-1 bg-red-100 flex flex-col">
      <CanvasHeader />
      <div className="flex-1 bg-yellow-200">Canvas</div>
    </div>
  );
};

export default Canvas;
