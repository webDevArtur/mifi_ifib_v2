export const techObjectsKeys = {
  articles: ["articles"] as const,
  equipments: ["equipments"] as const,
  mainVideo: ["mainVideo"] as const,
  terms: ["terms"] as const,
  currentUser: ["currentUser"] as const,
  videos: ["videos"] as const,
  podcasts: ["podcasts"] as const,
  practices: ["practices"] as const,
  equipmentGroups: ["equipmentGroups"] as const,
};

export const articleDetailsKeys = {
  byId: (articleId: string) => ["articleId", articleId] as const,
};
