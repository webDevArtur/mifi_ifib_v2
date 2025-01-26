import { useMutation } from "@tanstack/react-query";
import { markVideo } from "services/videos";

export const useVideoAsMark = () => {
  return useMutation<void, Error, number>({
    mutationFn: async (videoId) => {
      return markVideo(videoId);
    },
    onError: (error) => {
      console.error("Failed to mark article as read:", error);
    },
  });
};
