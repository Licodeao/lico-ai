import type { FC, ReactNode } from "react";
import WorkSpaceHeader from "./components/header";
import WorkSpaceContent from "./components/content";

interface IProps {
  children?: ReactNode;
}

const WorkSpace: FC<IProps> = () => {
  return (
    <div className="w-screen h-screen text-white flex justify-center items-center flex-col bg-[#141414]">
      <WorkSpaceHeader />
      <WorkSpaceContent />
    </div>
  );
};

export default WorkSpace;
