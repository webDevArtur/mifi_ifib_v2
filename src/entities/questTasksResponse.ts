import { z } from "zod";

export const QuestTaskOptionSchema = z.object({
  id: z.number(),
  value: z.string(),
});

export const QuestTaskSubmissionSchema = z.object({
  score: z.number(),
  isCorrect: z.boolean(),
  userInput: z.object({
    options: z.array(z.number()).nullable(),
    orderOptions: z.array(z.number()),
    text: z.string().nullable(),
  }),
  attemptNumber: z.number(),
  bestScore: z.number(),
  wasCorrect: z.boolean(),
});

export const QuestTaskSchema = z.object({
  id: z.number(),
  quest: z.number(),
  orderNum: z.number(),
  body: z.string(),
  picture: z.string().nullable(),
  type: z.string(),
  options: z.array(QuestTaskOptionSchema).nullable(),
  maxScore: z.number(),
  maxScoreSecond: z.number().optional(), 
  maxScoreThird: z.number().optional(),
  nextAttemptMaxScore: z.number().optional(),
  incorrectSubmissionText: z.string().nullable().optional(),
  multipleSelectionAllowed: z.boolean(),
  submission: QuestTaskSubmissionSchema.optional(),
  orderOptions: z.array(QuestTaskOptionSchema).nullable(),
});

export const QuestTasksResponseSchema = z.object({
  totalItems: z.number(),
  pageNumber: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
  items: z.array(QuestTaskSchema),
});
