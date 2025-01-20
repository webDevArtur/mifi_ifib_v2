import { z } from "zod";

const ArticleSchema = z.object({
  id: z.number(),
  marked: z.boolean(),
  completed: z.boolean(),
  name: z.string(),
  description: z.string(),
  author: z.string(),
  cover: z.string(),
  document: z.string().optional(),
});

export const ArticleResponseSchema = z.object({
  totalItems: z.number(),
  pageNumber: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
  items: z.array(ArticleSchema),
});
