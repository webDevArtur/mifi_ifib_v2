import { z } from "zod";

const TermSchema = z.object({
  id: z.number(),
  name: z.string(),
  definition: z.string(),
});

export const TermResponseSchema = z.object({
  totalItems: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
  pageNumber: z.number(),
  items: z.array(TermSchema),
});
