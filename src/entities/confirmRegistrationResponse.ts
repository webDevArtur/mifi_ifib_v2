import { z } from "zod";

export const ConfirmRegistrationResponseSchema = z.object({
  token: z.string(),
});
