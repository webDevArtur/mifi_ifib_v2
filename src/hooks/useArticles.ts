import { useQuery } from '@tanstack/react-query';

import { getArticles } from 'services/articles';
import { ArticleResponse } from 'entities';

import { techObjectsKeys } from './keys';

const articlesQuery = (page: number, size: number, search?: string) => ({
  queryKey: [techObjectsKeys.articles, { page, size, search }],
  queryFn: async () => getArticles(page, size, search),
});

export const useArticles = (page: number, size: number, search?: string) =>
  useQuery<ArticleResponse>({
    ...articlesQuery(page, size, search),
    throwOnError: false,
  });
