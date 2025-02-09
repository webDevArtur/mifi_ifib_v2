export const techObjectsKeys = {
  articles: ["articles"] as const,
  equipments: ["equipments"] as const,
  terms: ["terms"] as const,
  teamMembers: ["teamMembers"] as const,
  currentUser: ["currentUser"] as const,
  videos: ["videos"] as const,
  podcasts: ["podcasts"] as const,
  practices: ["practices"] as const,
  equipmentGroups: ["equipmentGroups"] as const,
  quests: ["quests"] as const,
  questTasks: ["questTasks"] as const,
  userRanks: ["userRanks"] as const,
  progressStatistics: ["progressStatistics"] as const,
};

export const articleDetailsKeys = {
  byId: (articleId: string) => ["articleId", articleId] as const,
};
