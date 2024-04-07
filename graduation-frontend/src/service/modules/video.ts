import LiRequest from "../index";

interface IAccessToken {
  access_token: string;
  expires_in: number;
}

export const getAccessToken = async () => {
  return LiRequest.get<IAccessToken>(`/copilot/access_token`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

export const generateVideoFromText = async () => {
  return LiRequest.post(
    `/copilot/text2video`,
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

export const getFinishedVideo = async (jobId: string) => {
  return LiRequest.post(
    `/copilot/video_finished`,
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

export const getVideo = async () => {
  return LiRequest.get("/copilot/all");
};
