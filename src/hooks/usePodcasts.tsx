import { useQuery } from "@tanstack/react-query";
import { getPodcasts } from "services/podcasts";
import { PodcastResponse } from "entities";
import { techObjectsKeys } from "./keys";

const podcastsQuery = (page?: number, size?: number, search?: string, ids?: number[]) => ({
  queryKey: [techObjectsKeys.podcasts, { page, size, search, ids }],
  queryFn: async () => getPodcasts(page, size, search, ids),
});

export const usePodcasts = (page?: number, size?: number, search?: string, ids?: number[]) =>
  useQuery<PodcastResponse>({
    ...podcastsQuery(page, size, search, ids),
    throwOnError: false,
  });
