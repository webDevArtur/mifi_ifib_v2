import { useMutation } from "@tanstack/react-query";
import { markPodcast } from "services/podcasts";

export const usePodcastAsMark = () => {
  return useMutation<void, Error, number>({
    mutationFn: async (podcastId) => {
      return markPodcast(podcastId);
    },
    onError: (error) => {
      console.error("Failed to mark article as read:", error);
    },
  });
};
