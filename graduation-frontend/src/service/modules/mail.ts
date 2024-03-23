import LiRequest, { IResultData } from "../index";
import type { IData } from "./home";

export const postLoginEmail = async (email: string) => {
  return LiRequest.get<IResultData<IData>>("/mail/code", {
    address: email,
  });
};

export const ResendEmail = async (email: string) => {
  return LiRequest.get<IResultData<IData>>("/mail/resend", {
    address: email,
  });
};
