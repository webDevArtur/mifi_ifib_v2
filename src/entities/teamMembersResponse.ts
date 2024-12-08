import { z } from "zod";

export const TeamMembersResponseSchema = z.object({
  name: z.string(),
  image: z.string().url(),
  description: z.string(),
});
