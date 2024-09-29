export const techObjectsKeys = {
  articles: ['articles'] as const,
};

export const articleDetailsKeys = {
  byId: (articleId: string) => ['articleId', articleId] as const,
};
