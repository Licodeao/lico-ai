import type { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  children?: ReactNode;
  albumName: string;
}

const Album: FC<IProps> = ({ albumName }) => {
  const navigate = useNavigate();
  return (
    <div
      className="rounded-lg bg-[#2C2C2C] w-[200px] h-[50px] flex flex-row justify-start items-center gap-4 px-3"
      onClick={() => navigate(`/workspace/media/album/${albumName}`)}
    >
      <img
        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        alt="album"
        className="w-12 h-7 rounded-md"
      />
      <span className="text-sm">{albumName}</span>
    </div>
  );
};

export default Album;
