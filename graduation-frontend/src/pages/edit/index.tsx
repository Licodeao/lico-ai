import type { FC, ReactNode } from "react";
import Nav from "./components/nav";
import Ffmpeg from "./components/ffmpeg";
import Operator from "./components/operator";
import Canvas from "./components/canvas";

interface IProps {
  children?: ReactNode;
}

const Edit: FC<IProps> = () => {
  return (
    <div className="w-screen h-screen flex flex-row items-center text-white">
      <Nav />
      <div className="w-full h-full flex flex-col">
        <div className="flex-1 flex items-center">
          <Operator />
          <Canvas />
        </div>
        <Ffmpeg />
      </div>
    </div>
  );
};

export default Edit;
