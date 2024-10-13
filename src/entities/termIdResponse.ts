import { z } from 'zod';

export const TermIdResponseSchema = z.object({
  id: z.number(),
});
