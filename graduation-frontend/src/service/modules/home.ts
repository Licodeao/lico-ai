import LiRequest, { IResultData } from "../index";

export interface IHomeData {
  data?: string;
}

export const getHomeData = async () => {
  return LiRequest.get<IResultData<IHomeData>>("/");
};
