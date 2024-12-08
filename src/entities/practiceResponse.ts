import { z } from "zod";

export const PracticeResponseSchema = z.object({
  id: z.number(),
  practice_group: z.string(),
  link: z.string(),
});
