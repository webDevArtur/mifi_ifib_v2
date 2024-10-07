export const techObjectsKeys = {
  articles: ['articles'] as const,
  equipments: ['equipments'] as const,
  mainVideo: ['mainVideo'] as const,
};

export const articleDetailsKeys = {
  byId: (articleId: string) => ['articleId', articleId] as const,
};
