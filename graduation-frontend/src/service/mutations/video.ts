import { useMutation } from "@tanstack/react-query";
import { GenerateVideoFromText } from "../modules/video";

export const useGenerateVideoFromTextMutation = () => {
  return useMutation({
    mutationKey: ["generateVideoFromText"],
    mutationFn: () => GenerateVideoFromText(),
  });
};
