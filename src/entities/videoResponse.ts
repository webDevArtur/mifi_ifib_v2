import { z } from "zod";

export const VideoSchema = z.object({
  id: z.number(),
  name: z.string(),
  theme: z.string(),
  description: z.string(),
  cover: z.string().url(),
  link: z.string().url(),
});

export const VideoResponseSchema = z.object({
  items: z.array(VideoSchema),
  pageNumber: z.number(),
  pageSize: z.number(),
  totalItems: z.number(),
  totalPages: z.number(),
});
