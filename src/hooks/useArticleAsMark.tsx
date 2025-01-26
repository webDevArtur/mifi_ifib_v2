import { useMutation } from "@tanstack/react-query";
import { markArticle } from "services/articles";

export const useArticleAsMark = () => {
  return useMutation<void, Error, number>({
    mutationFn: async (articleId) => {
      return markArticle(articleId);
    },
    onError: (error) => {
      console.error("Failed to mark article as read:", error);
    },
  });
};
