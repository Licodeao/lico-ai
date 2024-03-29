import { useState, type FC, type ReactNode } from "react";
import SettingSvg from "@/assets/img/setting.svg";
import MediaSvg from "@/assets/img/media.svg";
import AudioSvg from "@/assets/img/audio.svg";
import TextSvg from "@/assets/img/text.svg";
import ElementSvg from "@/assets/img/element.svg";
import RecordSvg from "@/assets/img/record.svg";

import SettingSelectedSvg from "@/assets/img/setting-selected.svg";
import MediaSelectedSvg from "@/assets/img/media-selected.svg";
import AudioSelectedSvg from "@/assets/img/audio-selected.svg";
import TextSelectedSvg from "@/assets/img/text-selected.svg";
import ElementSelectedSvg from "@/assets/img/element-selected.svg";
import RecordSelectedSvg from "@/assets/img/record-selected.svg";
interface IProps {
  children?: ReactNode;
}

interface navItem {
  id: number;
  icon: string;
  selectedIcon: string;
  description: string;
}

const Nav: FC<IProps> = () => {
  const navList: navItem[] = [
    {
      id: 0,
      icon: SettingSvg,
      selectedIcon: SettingSelectedSvg,
      description: "Setting",
    },
    {
      id: 1,
      icon: MediaSvg,
      selectedIcon: MediaSelectedSvg,
      description: "Media",
    },
    {
      id: 2,
      icon: AudioSvg,
      selectedIcon: AudioSelectedSvg,
      description: "Audio",
    },
    {
      id: 3,
      icon: TextSvg,
      selectedIcon: TextSelectedSvg,
      description: "Text",
    },
    {
      id: 4,
      icon: ElementSvg,
      selectedIcon: ElementSelectedSvg,
      description: "Element",
    },
    {
      id: 5,
      icon: RecordSvg,
      selectedIcon: RecordSelectedSvg,
      description: "Record",
    },
  ];

  const [curIndex, setCurIndex] = useState<number>(0);

  const handleClick = (e) => {
    setCurIndex(Number(e.target.id));
  };

  return (
    <div className="w-full h-full flex-1 border-r-2 border-r-[#DFE0E5]">
      <div className="w-[80px] h-full flex flex-col items-center gap-4 mt-4">
        {navList.map((item, index) => {
          return (
            <img
              key={item.description}
              id={item.id.toString()}
              src={curIndex === index ? item.selectedIcon : item.icon}
              alt={item.description}
              onClick={(e) => handleClick(e)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Nav;
