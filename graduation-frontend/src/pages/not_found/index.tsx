import type { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

const NotFound: FC<IProps> = () => {
  return <div>NotFound</div>;
};

export default NotFound;
