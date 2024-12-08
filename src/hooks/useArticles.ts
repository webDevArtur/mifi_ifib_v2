import { useQuery } from "@tanstack/react-query";

import { getArticles } from "services/articles";
import { ArticleResponse } from "entities";

import { techObjectsKeys } from "./keys";

const articlesQuery = (id?: number[], page?: number, pageSize?: number, search?: string) => ({
  queryKey: [techObjectsKeys.articles, { id, page, pageSize, search }],
  queryFn: async () => getArticles(id, page, pageSize, search),
});

export const useArticles = (id?: number[], page?: number, pageSize?: number, search?: string) =>
  useQuery<ArticleResponse>({
    ...articlesQuery(id, page, pageSize, search),
    throwOnError: false,
  });
