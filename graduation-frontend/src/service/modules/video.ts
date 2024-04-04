import axios from "axios";

export const getAccessToken = (apiKey: string, secretKey: string) => {
  return axios.post(
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
  );
};

export const textToVideo = () => {
  return axios.post(
    "https://aip.baidubce.com/rpc/2.0/brain/creative/ttv/material"
  );
};
