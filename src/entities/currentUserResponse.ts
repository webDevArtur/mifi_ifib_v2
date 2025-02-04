import { z } from "zod";

export const CurrentUserDetailsSchema = z.object({
  lastName: z.string(),
  firstName: z.string(),
  middleName: z.string().nullable(),
  birthDate: z.string(),
  email: z.string().email(),
  socialNetwork: z.string().optional(),
  educationalFacility: z.string(),
  sphereOfInterest: z.string(),
  role: z.string().nullable(),
  isVerified: z.boolean(),
  questsScore: z.number(),
  olympiadRegistration: z.boolean(),
  isDocumentaryVerified: z.boolean(),
  isDocumentUploaded: z.boolean(), 
});

export const CurrentUserSchema = z.object({
  user: CurrentUserDetailsSchema,
});