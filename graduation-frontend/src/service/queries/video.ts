import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../modules/video";

export const useVideoGetAccessToken = () => {
  return useQuery({
    queryKey: ["videoGetAccessToken"],
    queryFn: () => getAccessToken,
  });
};
