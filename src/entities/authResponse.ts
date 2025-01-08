import { z } from "zod";

export const AuthResponseSchema = z.object({
  access: z.string(),
  refresh: z.string(),
});
