import { Avatar } from "@mui/material";
import type { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
  username: string;
  email: string;
  url: string;
  role: boolean;
}

const Member: FC<IProps> = ({ url, username, email, role }) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row gap-2">
        <Avatar src={url} alt="avatar">
          {username}
        </Avatar>
        <div className="flex flex-col gap-1">
          <div className="text-md">{username}</div>
          <div className="text-[#A5A7AD] text-xs">{email}</div>
        </div>
      </div>
      <div>{role === true ? "管理员" : "成员"}</div>
    </div>
  );
};

export default Member;
