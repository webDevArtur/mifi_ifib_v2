import { z } from 'zod';

export const ArticleDetailsResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  author: z.string(),
  coverUrl: z.string().url(),
  documentUrl: z.string().url(),
});
