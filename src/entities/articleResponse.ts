import { z } from 'zod';

const ArticleSchema = z.object({
  id: z.number(),
  name: z.string(),
  author: z.string(),
  coverUrl: z.string().url(),
});

export const ArticleResponseSchema = z.object({
  totalItems: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
  pageNumber: z.number(),
  items: z.array(ArticleSchema),
});
