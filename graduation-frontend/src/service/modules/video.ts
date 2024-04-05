import LiRequest from "../index";

interface IAccessToken {
  access_token: string;
  expires_in: number;
}

const { VITE_BAIDU_API_KEY, VITE_BAIDU_SECRET_KEY } = import.meta.env;

export const getAccessToken = async () => {
  return LiRequest.post<IAccessToken>(
    `/copilot/access_token?grant_type=client_credentials&client_id=${VITE_BAIDU_API_KEY}&client_secret=${VITE_BAIDU_SECRET_KEY}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
};

export const generateVideoFromText = async (access_token: string) => {
  return LiRequest.post(
    `/copilot/text2video?access_token=${access_token}`,
    {
      structs: [
        {
          type: "text",
          text: "大婶大婶大婶大婶大婶大婶的",
        },
        {
          type: "image",
          mediaSource: {
            type: 3,
            url: "https://7gugu.com/wp-content/uploads/2024/03/IMG_0749-1200x1600.jpeg",
          },
        },
        {
          type: "text",
          text: "嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻",
        },
        {
          type: "image",
          mediaSource: {
            type: 3,
            url: "https://7gugu.com/wp-content/uploads/2024/03/IMG_0749-1200x1600.jpeg",
          },
        },
      ],
      config: {
        productType: "video",
        duration: -1,
        resolution: [1280, 720],
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
};

export const getFinishedVideo = async (access_token: string, jobId: string) => {
  return LiRequest.post(
    `/copilot/video_finished?access_token=${access_token}`,
    {
      jobId,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
};
