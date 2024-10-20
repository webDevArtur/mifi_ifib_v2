import { z } from "zod";

export const RegistrationResponseSchema = z.object({
  token: z.string(),
});
