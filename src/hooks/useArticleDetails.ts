import { useQuery } from '@tanstack/react-query';
import { getArticleById } from 'services/articles';
import { ArticleDetailsResponse } from 'entities';
import { techObjectsKeys } from './keys';

const articleDetailsQuery = (articleId: number) => ({
  queryKey: [techObjectsKeys.articles, { articleId }],
  queryFn: async () => getArticleById(articleId),
});

export const useArticleDetails = (articleId: number) =>
  useQuery<ArticleDetailsResponse>({
    ...articleDetailsQuery(articleId),
    throwOnError: true,
  });
