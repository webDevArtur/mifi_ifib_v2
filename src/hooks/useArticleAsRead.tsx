import { useMutation } from "@tanstack/react-query";
import { articleAsRead } from "services/articles";

export const useArticleAsRead = () => {
  return useMutation<void, Error, number>({
    mutationFn: async (articleId) => {
      return articleAsRead(articleId);
    },
    onError: (error) => {
      console.error("Failed to mark article as read:", error);
    },
  });
};
