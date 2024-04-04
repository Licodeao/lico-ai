import axios from "axios";

interface IAccessToken {
  access_token: string;
  expires_in: number;
}

export const getAccessToken = async (apiKey: string, secretKey: string) => {
  return (
    await axios.post<IAccessToken>(
      "https://aip.baidubce.com/oauth/2.0/token",
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
    )
  ).data;
};

export const GenerateVideoFromText = async () => {
  const { VITE_BAIDU_API_KEY, VITE_BAIDU_SECRET_KEY } = import.meta.env;

  const { access_token } = await getAccessToken(
    VITE_BAIDU_API_KEY,
    VITE_BAIDU_SECRET_KEY
  );

  const data = await axios.post(
    "https://aip.baidubce.com/rpc/2.0/brain/creative/ttv/material",
    {
      source: {
        structs: [
          {
            type: "text",
            text: "对于可控的事情，要保持谨慎； 对于不可控的事情，要保持乐观。人只能做自己能力范围内的事情，你要接受这个事实，并且以乐观的心，去应对这一切",
          },
          {
            type: "text",
            text: "我们登上并非我们所选择的舞台，演出并非我们所选择的剧本，这时候我们经常会羡慕别人的剧本，我有时候非常羡慕别人的剧本，但是，没有谁的剧本值得羡慕，你只能把你自己的剧本给演好。",
          },
        ],
        config: {
          productType: "video",
          duration: -1,
          resolution: [1280, 720],
        },
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        access_token,
      },
    }
  );

  return data;
};
