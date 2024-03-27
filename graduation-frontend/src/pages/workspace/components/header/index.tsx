import * as React from "react";
import { useState, type FC, type ReactNode } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import UpdateIcon from "@mui/icons-material/Update";
import EastIcon from "@mui/icons-material/East";

import UpgradeLogo from "@/components/upgrade";
interface IProps {
  children?: ReactNode;
}

const WorkSpaceHeader: FC<IProps> = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleClickProfile = (e: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (type: string) => {
    setAnchorEl(null);
    console.log(type);
  };

  const handleMenuClick = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding key={"主页"}>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="主页" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding key={"媒体库"}>
          <ListItemButton>
            <ListItemIcon>
              <VideoLibraryIcon />
            </ListItemIcon>
            <ListItemText primary="媒体库" />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem key={"插件"}>
          <ListItemText primary="插件" />
        </ListItem>
        <ListItem key={"数字声音"}>
          <ListItemButton>
            <ListItemIcon>
              <KeyboardVoiceIcon />
            </ListItemIcon>
            <ListItemText primary="数字声音" />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem key={"历史记录"}>
          <ListItemText primary="历史记录" />
        </ListItem>

        <ListItem key={"纪录项"}>
          <ListItemButton>
            <ListItemIcon>
              <UpdateIcon />
            </ListItemIcon>
            <ListItemText primary="纪录项" />
          </ListItemButton>
        </ListItem>

        <ListItem key={"查看更多"}>
          <div className="flex flex-row items-center justify-start gap-2 cursor-pointer hover:text-[#8C8C8C]">
            <EastIcon />
            <ListItemText primary="查看更多" />
          </div>
        </ListItem>
      </List>

      <Divider />

      <div className="fixed bottom-1 left-1 right-1">
        <div className="text-sm mx-8">
          Powered By &copy;{" "}
          <a
            href="https://licodeao.netlify.app"
            className="cursor-pointer underline"
            target="__blank"
          >
            Licodeao
          </a>
        </div>
      </div>
    </Box>
  );

  return (
    <div className="w-full h-16 flex-4 border-b border-b-[#2C2C2C] flex justify-between items-center">
      <div className="flex justify-center items-center">
        <div
          className="w-1/8 h-full flex justify-center items-center px-5 py-4 cursor-pointer hover:bg-[#2C2D2F]"
          onClick={handleMenuClick}
        >
          <MenuIcon fontSize="medium" />
          <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </div>
        <div className="w-[1px] h-8 bg-[#2C2C2C]"></div>
      </div>

      <div className="w-full flex justify-start text-[17px] ml-5 font-bold gap-2">
        欢迎来到{" "}
        <span className="bg-gradient-to-tr from-purple-600 via-blue-500 to-green-400 bg-clip-text text-transparent">
          Lico AI
        </span>
        , 这是你的工作空间, 在这里发挥你的
        <span className="bg-gradient-to-tr from-red-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
          奇思妙想
        </span>
        吧 💥
      </div>

      <div className="w-1/6 h-full flex justify-around items-center">
        <div className="w-[1px] h-8 bg-[#2C2C2C] mr-2"></div>
        <button className="w-22 h-12 bg-[#F9A432] rounded-lg hover:bg-[#EB8A2A]">
          <div className="flex flex-row mx-3 my-1 justify-around items-center">
            <span>付费订阅</span>
            <div className="flex justify-center items-center w-[30px] h-[30px] bg-[#DE7722] rounded-md ml-2">
              <UpgradeLogo />
            </div>
          </div>
        </button>
        <div className="w-[1px] h-8 bg-[#2C2C2C] ml-2"></div>
        <div className="flex justify-around items-center gap-6">
          <div
            onClick={handleClickProfile}
            className="border border-solid border-[#4B4B4C] rounded-full mx-8 my-2"
          >
            <Avatar className="m-1" />
          </div>
          <Menu open={menuOpen} anchorEl={anchorEl} onClose={handleClose}>
            <MenuItem>Hi User</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("profile")}>
              个人信息
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("subscribe")}>
              订阅信息
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("usage")}>
              使用说明
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("setting")}>
              系统设置
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("faq")}>FAQs</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("logout")}>
              退出登录
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default WorkSpaceHeader;
