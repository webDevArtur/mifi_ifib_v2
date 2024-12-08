import { useQuery } from "@tanstack/react-query";
import { getVideos } from "services/videos";
import { VideoResponse } from "entities";

const videosQuery = (id?: number[], name?: string, page?: number, pageSize?: number) => ({
  queryKey: ['videos', { id, name, page, pageSize }],
  queryFn: async () => getVideos(id, name, page, pageSize),
});

export const useVideos = (id?: number[], name?: string, page?: number, pageSize?: number) =>
  useQuery<VideoResponse>({
    ...videosQuery(id, name, page, pageSize),
    throwOnError: false,
  });
