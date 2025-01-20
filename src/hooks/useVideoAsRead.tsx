import { useMutation } from "@tanstack/react-query";
import { videoAsRead } from "services/videos";

export const useVideoAsRead = () => {
  return useMutation<void, Error, number>({
    mutationFn: async (filmId) => {
      return videoAsRead(filmId);
    },
    onError: (error) => {
      console.error("Failed to mark video as read:", error);
    },
  });
};
