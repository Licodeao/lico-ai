import type { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
  albumName: string;
}

const Album: FC<IProps> = ({ albumName }) => {
  return <div>{albumName}</div>;
};

export default Album;
