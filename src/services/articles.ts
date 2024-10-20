import { api } from "./index";
import { ArticleResponse, ArticleDetailsResponse } from "entities/index";

export const getArticles = (page?: number, size?: number, search?: string) => {
  const searchQuery = search ? `&searchName=${search}` : "";

  return api<ArticleResponse>(
    `https://cybernexvpn-stage.ru/api/v1/article?pageNumber=${page}&pageSize=${size}${searchQuery}`,
    {
      method: "GET",
    },
  );
};

export const getArticleById = (articleId: number) => {
  return api<ArticleDetailsResponse>(
    `https://cybernexvpn-stage.ru/api/v1/article/${articleId}`,
    {
      method: "GET",
    },
  );
};
