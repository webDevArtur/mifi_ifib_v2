import { z } from "zod";

const CurrentUserSchema = z.object({
  id: z.number(),
  role: z.string(),
  lastName: z.string(),
  firstName: z.string(),
  rank: z.number(),
  score: z.number(),
});

const UserSchema = z.object({
  id: z.number(),
  role: z.string(),
  lastName: z.string(),
  firstName: z.string(),
  rank: z.number(),
  score: z.number(),
});

export const UserRankResponseSchema = z.object({
  currentUser: CurrentUserSchema,
  users: z.array(UserSchema),
});
