import type { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

const Ffmpeg: FC<IProps> = () => {
  return (
    <div className="w-full h-40 border-t-[1px] border-t-[#E1E1E3] bg-[#FFFFFF] flex flex-col">
      <div className="w-full h-14 flex flex-row justify-between items-center">
        <div className="flex flex-row justify-center items-center gap-2">
          <div>split</div>
          <div>voicer</div>
        </div>
        <div className="w-1/2 flex-1 flex flex-row justify-center items-center gap-2">
          <div>operator</div>
          <div>time</div>
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <div>sclae</div>
          <div>setting</div>
        </div>
      </div>
      <div className="flex-1 bg-black">Timeline</div>
    </div>
  );
};

export default Ffmpeg;
