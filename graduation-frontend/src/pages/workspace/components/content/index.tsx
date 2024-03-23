import type { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

const WorkSpaceContent: FC<IProps> = () => {
  return (
    <div className="w-full h-screen flex-6 bg-slate-400">WorkSpaceContent</div>
  );
};

export default WorkSpaceContent;
