import { z } from "zod";

export const QuestTaskOptionSchema = z.object({
  id: z.number(),
  value: z.string(),
});

export const QuestTaskSubmissionSchema = z.object({
  score: z.number(),
  isCorrect: z.boolean(),
  userInput: z.object({
    options: z.array(z.number()),
    text: z.string(),
  }),
});

export const QuestTaskSchema = z.object({
  id: z.number(),
  quest: z.number(),
  orderNum: z.number(),
  body: z.string(),
  picture: z.string().nullable(),
  type: z.string(),
  options: z.array(QuestTaskOptionSchema),
  maxScore: z.number(),
  multipleSelectionAllowed: z.boolean(),
  submission: QuestTaskSubmissionSchema.optional(),
});

export const QuestTasksResponseSchema = z.object({
  totalItems: z.number(),
  pageNumber: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
  items: z.array(QuestTaskSchema),
});
