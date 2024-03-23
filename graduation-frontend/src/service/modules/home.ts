import LiRequest, { IResultData } from "../index";

export interface IData {
  code?: number;
  data?: string;
  statusCode?: number;
}

export const getHomeData = async () => {
  return LiRequest.get<IResultData<IData>>("/");
};
