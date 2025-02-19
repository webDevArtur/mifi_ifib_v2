import { useQuery } from "@tanstack/react-query";
import { getHomeVideo } from "services/homeVideo";

export interface HomeVideoResponse {
    url: string;
}

const homeVideoQuery = () => ({
  queryKey: ["home-video"],
  queryFn: async () => getHomeVideo(),
});

export const useHomeVideo = () =>
  useQuery<HomeVideoResponse>({
    ...homeVideoQuery(),
    throwOnError: false,
  });
