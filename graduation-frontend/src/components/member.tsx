import { Avatar } from "@mui/material";
import type { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

const Member: FC<IProps> = () => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row gap-2">
        <Avatar>Li</Avatar>
        <div className="flex flex-col gap-1">
          <div className="text-md">username</div>
          <div className="text-[#A5A7AD] text-xs">user email</div>
        </div>
      </div>
      <div>role</div>
    </div>
  );
};

export default Member;
