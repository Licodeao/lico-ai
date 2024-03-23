import LiRequest, { IResultData } from "../index";
import type { IData } from "./home";

export const login = async (email: string, validateCode: string) => {
  return LiRequest.post<IResultData<IData>>("/user/login", {
    email,
    validateCode,
  });
};
