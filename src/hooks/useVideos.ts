import { useQuery } from "@tanstack/react-query";
import { getVideos } from "services/videos";
import { VideoResponse } from "entities";

const videosQuery = (
  id?: number[],
  name?: string,
  page?: number,
  pageSize?: number,
  category?: string
) => ({
  queryKey: ['videos', { id, name, page, pageSize, category }],
  queryFn: async () => getVideos(id, name, page, pageSize, category),
});

export const useVideos = (
  id?: number[],
  name?: string,
  page?: number,
  pageSize?: number,
  category?: string
) =>
  useQuery<VideoResponse>({
    ...videosQuery(id, name, page, pageSize, category),
    throwOnError: false,
  });

