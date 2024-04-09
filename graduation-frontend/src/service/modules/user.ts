import LiRequest, { IResultData } from "../index";

export interface IUserData {
  code?: number;
  data?: string;
  access_token?: string;
  refresh_token?: string;
  statusCode?: number;
}

export const login = async (email: string, validateCode: string) => {
  return LiRequest.post<IResultData<IUserData>>("/user/login", {
    email,
    validateCode,
  });
};
