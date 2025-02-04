import { z } from "zod";

// Схема для опций задания
export const QuestTaskOptionSchema = z.object({
  id: z.number(),
  value: z.string(),
});

// Схема для данных о сдаче задания
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

// Схема для одного задания
export const QuestTaskSchema = z.object({
  id: z.number(),
  quest: z.number(),
  orderNum: z.number(),
  body: z.string(),
  picture: z.string().nullable(),
  type: z.string(),
  options: z.array(QuestTaskOptionSchema).nullable(),
  maxScore: z.number(),
  maxScoreSecond: z.number().optional(), // Добавлено максимальное количество баллов для второй попытки
  maxScoreThird: z.number().optional(),  // Добавлено максимальное количество баллов для третьей попытки
  nextAttemptMaxScore: z.number().optional(), // Добавлено для максимального балла на следующую попытку
  incorrectSubmissionText: z.string().nullable().optional(), // Добавлено текстовое сообщение при неверном ответе
  multipleSelectionAllowed: z.boolean(),
  submission: QuestTaskSubmissionSchema.optional(),
  orderOptions: z.array(QuestTaskOptionSchema).nullable(),
});

// Схема для ответа с заданиями
export const QuestTasksResponseSchema = z.object({
  totalItems: z.number(),
  pageNumber: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
  items: z.array(QuestTaskSchema),
});
