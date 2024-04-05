import LiRequest from "../index";

interface IAccessToken {
  access_token: string;
  expires_in: number;
}

export const getAccessToken = async (apiKey: string, secretKey: string) => {
  return LiRequest.post<IAccessToken>(
    "/copilot/access_token",
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params: {
        grant_type: "client_credentials",
        client_id: apiKey,
        client_secret: secretKey,
      },
    }
  );
};

export const generateVideoFromText = async (access_token: string) => {
  return LiRequest.post(
    "/copilot/text2video",
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params: {
        access_token,
      },
    }
  );
};

export const getFinishedVideo = async (access_token: string) => {
  return LiRequest.post(
    "/copilot/video_finished",
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params: {
        access_token,
      },
    }
  );
};
