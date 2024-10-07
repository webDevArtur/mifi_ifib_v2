import { z } from 'zod';

export const TeamMembersResponseSchema = z.object({
    name: z.string(),
    imageUrl: z.string().url(),
    description: z.string(),
});
