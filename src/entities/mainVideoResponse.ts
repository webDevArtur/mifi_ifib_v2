import { z } from 'zod';

export const mainVideoResponseSchema = z.object({
  url: z.string(),
});
