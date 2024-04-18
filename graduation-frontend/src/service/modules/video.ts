import LiRequest from "../index";

export const getVideo = async (
  textList,
  imageList,
  digitalHumanId,
  ttsPer,
  resolution
) => {
  return LiRequest.post("/copilot/text2video", {
    textList,
    imageList,
    digitalHumanId,
    ttsPer,
    resolution,
  });
};

export const query = async () => {
  return LiRequest.get("/copilot/query");
};

export const exportVideo = async (url) => {
  return LiRequest.get("/copilot/export", {
    url,
  });
};
