import type { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

const Ffmpeg: FC<IProps> = () => {
  return (
    <div className="w-full h-40 border-t-[1px] border-t-[#E1E1E3] bg-[#FFFFFF]">
      Ffmpeg
    </div>
  );
};

export default Ffmpeg;
