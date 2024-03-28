import type { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

const Nav: FC<IProps> = () => {
  return <div className="w-full h-full flex-1 bg-[#ffffff]">Nav</div>;
};

export default Nav;
