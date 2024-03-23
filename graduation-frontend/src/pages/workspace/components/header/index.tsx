import type { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

const WorkSpaceHeader: FC<IProps> = () => {
  return <div className="w-full h-16 bg-red-50 flex-4">WorkSpaceHeader</div>;
};

export default WorkSpaceHeader;
