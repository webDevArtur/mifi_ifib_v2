import { z } from "zod";

export const RegistrationResponseSchema = z.object({
  access: z.string(),
  refresh: z.string(),
});
