import LiRequest, { IResultData } from "../index";

export interface IUserData {
  code?: number;
  data?: string;
  access_token?: string;
  refresh_token?: string;
  statusCode?: number;
}

export interface IUpdateData {
  code?: number;
  message?: number;
}

export const login = async (email: string, validateCode: string) => {
  return LiRequest.post<IResultData<IUserData>>("/user/login", {
    email,
    validateCode,
  });
};

export const update = async (
  type: string,
  oldValue: string,
  newValue: string
) => {
  return LiRequest.post<IResultData<IUpdateData>>("/user/info", {
    type,
    oldValue,
    newValue,
  });
};

export const updateAvatar = async (file, username: string, email: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("username", username);
  formData.append("email", email);

  return LiRequest.post("/user/avatar", formData, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
};

export const updateWorkspaceName = async (
  id: number,
  workspaceName: string
) => {
  return LiRequest.post("/team/name", {
    id,
    workspaceName,
  });
};
