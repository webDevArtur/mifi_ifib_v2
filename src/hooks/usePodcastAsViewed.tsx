import { useMutation } from "@tanstack/react-query";
import { podcastAsViewed } from "services/podcasts";

export const usePodcastAsViewed = () => {
    return useMutation<void, Error, number>({
      mutationFn: podcastAsViewed,
      onError: (error) => {
        console.error("Failed to mark podcast as viewed:", error);
      },
    });
  };