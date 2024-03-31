import type { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

const Ffmpeg: FC<IProps> = () => {
  return <div className="bg-blue-400 h-40">Ffmpeg</div>;
};

export default Ffmpeg;
