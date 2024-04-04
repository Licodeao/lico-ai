import { useQuery } from "@tanstack/react-query";
import { GenerateVideoFromText } from "../modules/video";

export const useGenerateVideoFromText = () => {
  return useQuery({
    queryKey: ["generateVideoFromText"],
    queryFn: () => GenerateVideoFromText,
  });
};
