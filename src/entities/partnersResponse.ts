import { z } from "zod";

export const PartnersResponseSchema = z.object({
  id: z.string(),
  logoPic: z.string().url(),
});
