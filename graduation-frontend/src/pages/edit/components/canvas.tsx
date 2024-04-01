import type { FC, ReactNode } from "react";
import CanvasHeader from "./header";
import { useAppSelector } from "@/store/storeHook";

interface IProps {
  children?: ReactNode;
}

const Canvas: FC<IProps> = () => {
  const { canvasDefaultStyle } = useAppSelector((state) => ({
    canvasDefaultStyle: state.canvas.defaultCanvas,
  }));
  return (
    <div className="w-full h-full flex-1 bg-[#F7F7F8] flex flex-col">
      <CanvasHeader />
      <div className="flex-1 flex flex-col justify-center items-center gap-3">
        <div
          style={{
            ...canvasDefaultStyle.style,
          }}
        />
        <div className="w-1/4 h-[50px] flex flex-row justify-center items-center rounded-lg border-[0.5px] border-[##DFE0E5]">
          <div className="w-full flex flex-row justify-between items-center p-2">
            <div className="w-1/2 h-full bg-black">Size</div>
            <div className="w-[1px] h-12 bg-[#DFE0E5] mx-2"></div>
            <div className="w-1/2 h-full bg-slate-500">Background</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
