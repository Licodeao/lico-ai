import { createSlice } from "@reduxjs/toolkit";

interface AudioType {
  id: number;
  name: string;
}
interface Digital {
  id: string;
  alt: string;
  url: string;
}

interface StateType {
  dialogOpen: boolean;
  imageList: string[];
  textList: string[];
  digitalList: Digital[];
  audioList: AudioType[];
  resolutionList: string[];
  selectedDigital: "";
  selectedAudio: 0;
  selectedResolution: "";
}

const workspaceSlice = createSlice({
  name: "workspace",
  initialState: {
    dialogOpen: false,
    imageList: [],
    textList: [],
    digitalList: [
      {
        id: "2",
        alt: "灿儿",
        url: "https://creative-static.cdn.bcebos.com/public/F01DAF27445D4DAD82BF8DE8A57CF440.png",
      },
      {
        id: "3",
        alt: "逍遥",
        url: "https://creative-static.cdn.bcebos.com/public/DC1EF1A1B32F4A9EB2C691959873247D.png",
      },
      {
        id: "4",
        alt: "关关",
        url: "https://creative-static.cdn.bcebos.com/public/0886FA48D7DA4F9DB313FE163B1BA80B.png",
      },
      {
        id: "5",
        alt: "家乐",
        url: "https://creative-static.cdn.bcebos.com/public/AE992C455B2A4495A354413AE304EFEC.png",
      },
    ],
    audioList: [
      { id: 0, name: "小美" },
      { id: 1, name: "小宇" },
      { id: 3, name: "小云" },
      { id: 4, name: "小丫" },
      { id: 5, name: "小娇" },
      { id: 103, name: "小朵" },
      { id: 106, name: "小博" },
      { id: 110, name: "小童" },
      { id: 111, name: "小萌" },
      { id: 5003, name: "小遥" },
      { id: 5118, name: "小婷" },
      { id: 4003, name: "小耀" },
      { id: 4100, name: "小雯" },
      { id: 4103, name: "小米" },
      { id: 4105, name: "小灵" },
      { id: 4106, name: "小文" },
      { id: 4115, name: "小贤" },
      { id: 4117, name: "小乔" },
      { id: 4119, name: "小鹿" },
    ],
    resolutionList: [
      "1920x1080",
      "1280x720",
      "1024x576",
      "1080x1920",
      "720x1280",
      "576x1024",
    ],
    selectedDigital: "",
    selectedAudio: 0,
    selectedResolution: "",
  } as StateType,
  reducers: {
    changeDialogOpenAciton(state, { payload }) {
      state.dialogOpen = payload;
    },
    changeImageListAction(state, { payload }) {
      state.imageList.push(payload);
    },
    removeImageAction(state, { payload }) {
      const index = state.imageList.findIndex((item) => item === payload);
      state.imageList.splice(index, 1);
    },
    AddTextAction(state, { payload }) {
      state.textList.push(payload);
    },
    removeTextAction(state, { payload }) {
      const index = state.textList.findIndex((item) => item === payload);
      state.textList.splice(index, 1);
    },
    changeSelectedDigital(state, { payload }) {
      state.selectedDigital = payload;
    },
    changeSelectedAudio(state, { payload }) {
      state.selectedAudio = payload;
    },
    changeSelectedResolution(state, { payload }) {
      state.selectedResolution = payload;
    },
  },
});

export const {
  changeDialogOpenAciton,
  changeImageListAction,
  removeImageAction,
  AddTextAction,
  removeTextAction,
  changeSelectedDigital,
  changeSelectedAudio,
  changeSelectedResolution,
} = workspaceSlice.actions;
export default workspaceSlice.reducer;
