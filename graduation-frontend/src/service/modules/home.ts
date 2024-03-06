import LiRequest, { IResultData } from "../index";

export interface IData {
  code?: number;
  data?: string;
}

export const getHomeData = async () => {
  return LiRequest.get<IResultData<IData>>("/");
};

export const getVideo = async () => {
  return LiRequest.get<IResultData<IData>>("/video");
};
