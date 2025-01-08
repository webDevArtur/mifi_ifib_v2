import { z } from "zod";

export const QuestItemSchema = z.object({
  id: z.number(),
  isStarted: z.boolean(),
  score: z.number(),
  name: z.string(),
  questType: z.string(),
  complexity: z.number().min(1).max(3),
  cover: z.string().url(),
  maxScore: z.number(),
  isOnline: z.boolean(),
});

export const QuestResponseSchema = z.object({
  totalItems: z.number(),
  pageNumber: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
  items: z.array(QuestItemSchema),
});
