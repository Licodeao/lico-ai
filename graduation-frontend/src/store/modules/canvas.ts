import YoutubeSvg from "@/assets/img/youtube.svg";
import YoutubeShortSvg from "@/assets/img/youtube-shorts.svg";
import TikTokSvg from "@/assets/img/tiktok.svg";
import KuaiShouSvg from "@/assets/img/kuaishou.svg";
import WeiBoSvg from "@/assets/img/sina-weibo.svg";
import TwitterSvg from "@/assets/img/twitter.svg";
import FacebookVideoSvg from "@/assets/img/facebook-video.svg";
import InstagramStorySvg from "@/assets/img/instagram-story.svg";
import { createSlice } from "@reduxjs/toolkit";
import { getOnlyKey } from "@/utils";
import newCanvas from "./newCanvas";

interface Canvas {
  defaultCanvas?: {
    title: string;
    style: {
      width: string;
      height: string;
      backgroundColor: string;
      backgroundImage: string;
      backgroundPosition: string;
      backgroundSize: string;
      backgroundRepeat: string;
    };
    cmps: any[];
  };
  selectOption?: [
    {
      icon: any;
      label: string;
      ratio: string;
      value: number;
      width: number;
      height: number;
    }
  ];
  selectValue?: number;
  colorVisible?: boolean;
  settingColorVisible?: boolean;
  isPlay?: boolean;
  currentIndex?: number;
  video?: any[];
  isLoading: boolean;
}

const canvasSlice = createSlice({
  name: "canvas",
  initialState: {
    defaultCanvas: new newCanvas(),
    selectOption: [
      {
        icon: YoutubeSvg,
        label: "Youtube",
        ratio: "16:9",
        value: 1,
        width: 997,
        height: 561,
      },
      {
        icon: YoutubeShortSvg,
        label: "Youtube Short",
        ratio: "9:16",
        value: 2,
        width: 315,
        height: 561,
      },
      {
        icon: TikTokSvg,
        label: "抖音",
        ratio: "9:16",
        value: 3,
        width: 315,
        height: 561,
      },
      {
        icon: KuaiShouSvg,
        label: "快手",
        ratio: "9:16",
        value: 4,
        width: 315,
        height: 561,
      },
      {
        icon: WeiBoSvg,
        label: "微博",
        ratio: "16:9",
        value: 5,
        width: 997,
        height: 561,
      },
      {
        icon: TwitterSvg,
        label: "X (Twitter)",
        ratio: "1:1",
        value: 6,
        width: 561,
        height: 561,
      },
      {
        icon: FacebookVideoSvg,
        label: "Facebook Video",
        ratio: "1:1",
        value: 7,
        width: 561,
        height: 561,
      },
      {
        icon: InstagramStorySvg,
        label: "Instagram Story",
        ratio: "9:16",
        value: 8,
        width: 315,
        height: 561,
      },
    ],
    selectValue: 1,
    colorVisible: false,
    settingColorVisible: false,
    isPlay: false,
    currentIndex: 0,
    video: [],
    isLoading: false,
  } as any as Canvas,
  reducers: {
    changeCanvasWidthAndHeightAction(state, { payload }) {
      state.defaultCanvas!.style.width = payload.width;
      state.defaultCanvas!.style.height = payload.height;
    },
    changeSelectValueAction(state, { payload }) {
      state.selectValue = payload;
    },
    changeColorAction(state, { payload }) {
      state.defaultCanvas!.style.backgroundColor = payload;
    },
    changeColorVisibleAction(state, { payload }) {
      state.colorVisible = payload;
    },
    changeSettingColorVisibleAction(state, { payload }) {
      state.settingColorVisible = payload;
    },
    changeIsPlayAction(state, { payload }) {
      state.isPlay = payload;
    },
    changeCurrentIndexAction(state, { payload }) {
      state.currentIndex = payload;
    },
    addVideoAction(state, { payload }) {
      state.video!.push(payload);
    },
    changeIsLoading(state, { payload }) {
      state.isLoading = payload;
    },
    addCmps(state, { payload }) {
      const cmp = { ...payload, key: getOnlyKey() };

      state.defaultCanvas?.cmps.push(cmp);
    },
  },
});

export const {
  changeCanvasWidthAndHeightAction,
  changeSelectValueAction,
  changeColorAction,
  changeSettingColorVisibleAction,
  changeColorVisibleAction,
  changeIsPlayAction,
  changeCurrentIndexAction,
  addVideoAction,
  changeIsLoading,
  addCmps,
} = canvasSlice.actions;
export default canvasSlice.reducer;
