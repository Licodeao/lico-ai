import { type FC, type ReactNode } from "react";
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
import FilterSvg from "@/assets/img/filter.svg";
import FilterSelectedSvg from "@/assets/img/filter-selected.svg";
import { useNavigate } from "react-router-dom";
interface IProps {
  children?: ReactNode;
}

interface navItem {
  id: number;
  icon: string;
  title: string;
  description: string;
  selectedIcon: string;
  link: string;
}

const Nav: FC<IProps> = () => {
  const navList: navItem[] = [
    {
      id: 0,
      icon: SettingSvg,
      title: "设置",
      description: "Setting",
      selectedIcon: SettingSelectedSvg,
      link: "/edit/setting",
    },
    {
      id: 1,
      icon: MediaSvg,
      title: "视频",
      description: "Media",
      selectedIcon: MediaSelectedSvg,
      link: "/edit/media",
    },
    {
      id: 2,
      icon: AudioSvg,
      title: "音频",
      description: "Audio",
      selectedIcon: AudioSelectedSvg,
      link: "/edit/audio",
    },
    {
      id: 3,
      icon: TextSvg,
      title: "文本",
      description: "Text",
      selectedIcon: TextSelectedSvg,
      link: "/edit/text",
    },
    {
      id: 4,
      icon: ElementSvg,
      title: "元素",
      description: "Element",
      selectedIcon: ElementSelectedSvg,
      link: "/edit/element",
    },
    {
      id: 5,
      icon: RecordSvg,
      title: "录像",
      description: "Record",
      selectedIcon: RecordSelectedSvg,
      link: "/edit/record",
    },
    {
      id: 6,
      icon: FilterSvg,
      title: "滤镜",
      description: "Filter",
      selectedIcon: FilterSelectedSvg,
      link: "/edit/filter",
    },
  ];

  const curIndex = Number(localStorage.getItem("curIndex")) || 0;
  const navigate = useNavigate();

  const handleClick = (e) => {
    localStorage.setItem("curIndex", e.target.id);
    navigate(e.target.dataset.link);
  };

  return (
    <div className="w-full h-full flex-1 border-r-2 border-r-[#DFE0E5] bg-[#FFFFFF]">
      <div className="w-[80px] h-full flex flex-col items-center gap-4 mt-4">
        {navList.map((item, index) => {
          return (
            <div
              key={item.description}
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <img
                id={item.id.toString()}
                data-link={item.link}
                src={curIndex === index ? item.selectedIcon : item.icon}
                alt={item.description}
                onClick={(e) => handleClick(e)}
              />
              <span>{item.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Nav;
