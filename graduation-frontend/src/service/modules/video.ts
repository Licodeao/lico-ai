import axios from "axios";

interface IAccessToken {
  access_token: string;
  expires_in: number;
}

export const getAccessToken = async (apiKey: string, secretKey: string) => {
  return (
    await axios.post<IAccessToken>(
      "https://aip.baidubce.com/oauth/2.0/token",
      {
        grant_type: "client_credentials",
        client_id: apiKey,
        client_secret: secretKey,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
  ).data;
};

export const textToVideo = () => {
  return axios.post(
    "https://aip.baidubce.com/rpc/2.0/brain/creative/ttv/material"
  );
};
