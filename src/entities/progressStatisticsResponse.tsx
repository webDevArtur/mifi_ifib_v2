import { z } from "zod";

export const ProgressStatisticsResponseSchema = z.object({
  sumMaxScore: z.number(),
  userScore: z.number(),
  questsTotalCount: z.number(),
  questsCompletedCount: z.number(),
  practiceTasksTotalCount: z.number(),
  practiceTasksCompletedCount: z.number(),
  articlesCompletedCount: z.number(),
  podcastsCompletedCount: z.number(),
  filmsCompletedCount: z.number(),
});

