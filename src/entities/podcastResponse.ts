import { z } from "zod";

const PodcastSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  cover: z.string(),
  link: z.string(),
  marked: z.boolean(),
  completed: z.boolean(),
});

export const PodcastResponseSchema = z.object({
  totalItems: z.number(),
  pageNumber: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
  items: z.array(PodcastSchema),
});
