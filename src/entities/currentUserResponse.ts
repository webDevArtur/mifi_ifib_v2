import { z } from "zod";

export const CurrentUserSchema = z.object({
  lastName: z.string(),
  firstName: z.string(),
  middleName: z.string().nullable(),
  birthDate: z.string(),
  email: z.string().email(),
  socialNetwork: z.string().optional(),
  educationalStatus: z.string().nullable(),
  educationalFacility: z.string(),
  sphereOfInterest: z.string(),
  role: z.number(),
  isActive: z.boolean(),
});
