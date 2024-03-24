import * as React from "react";
import { useState, type FC, type ReactNode } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import UpgradeLogo from "@/components/upgrade";

interface IProps {
  children?: ReactNode;
}

const WorkSpaceHeader: FC<IProps> = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handleClickProfile = (e: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="w-full h-16 flex-4 border-b border-b-[#2C2C2C] flex justify-between items-center">
      <div className="flex justify-center items-center">
        <div className="w-1/8 h-full flex justify-center items-center px-5 py-4 cursor-pointer hover:bg-[#2C2D2F]">
          <MenuIcon fontSize="medium" />
        </div>
        <div className="w-[1px] h-8 bg-[#2C2C2C]"></div>
      </div>

      <div className="w-full flex justify-start text-[17px] ml-5 font-bold gap-2">
        欢迎来到{" "}
        <span className="bg-gradient-to-tr from-purple-600 via-blue-500 to-green-400 bg-clip-text text-transparent">
          Lico AI
        </span>
        , 这是你的工作空间, 在这里发挥你的奇思妙想吧 💥
      </div>

      <div className="w-1/6 h-full flex justify-around items-center">
        <div className="w-[1px] h-8 bg-[#2C2C2C]"></div>
        <button className="w-22 h-12 bg-[#F9A432] rounded-lg hover:bg-[#EB8A2A]">
          <div className="flex flex-row mx-3 my-1 justify-around items-center">
            <span>付费订阅</span>
            <div className="flex justify-center items-center w-[30px] h-[30px] bg-[#DE7722] hover:bg-[#EB8B2A] rounded-md ml-2">
              <UpgradeLogo />
            </div>
          </div>
        </button>
        <div className="w-[1px] h-8 bg-[#2C2C2C]"></div>
        <div className="flex justify-around items-center gap-6">
          <div
            onClick={handleClickProfile}
            className="border border-solid border-[#4B4B4C] rounded-full"
          >
            <Avatar className="m-1" />
          </div>
          <Menu open={menuOpen} anchorEl={anchorEl} onClose={handleClose}>
            <MenuItem onClick={handleClose}>个人信息</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default WorkSpaceHeader;
