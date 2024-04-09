import LiRequest from "../index";

export const getVideo = async () => {
  return LiRequest.post("/copilot/text2video");
};
