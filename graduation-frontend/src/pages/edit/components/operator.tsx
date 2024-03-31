import type { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface IProps {
  children?: ReactNode;
}

const Operator: FC<IProps> = () => {
  return (
    <div className="w-1/4 h-[800px] bg-[#ffffff] overflow-scroll">
      <Outlet />
    </div>
  );
};

export default Operator;
