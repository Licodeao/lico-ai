import type { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

const Copilot: FC<IProps> = () => {
  return <div className="flex-6 py-4 px-8">Copilot</div>;
};

export default Copilot;
