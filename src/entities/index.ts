import { z } from 'zod';

import { RegistrationResponseSchema } from './registrationResponse';
import { ConfirmRegistrationResponseSchema } from './confirmRegistrationResponse';
import { AuthResponseSchema } from './authResponse';
import { ArticleResponseSchema } from './articleResponse';
import { ArticleDetailsResponseSchema } from './articleDetailsResponse';

export type RegistrationResponse = z.infer<typeof RegistrationResponseSchema>;
export type ConfirmRegistrationResponse = z.infer<
  typeof ConfirmRegistrationResponseSchema
>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type ArticleResponse = z.infer<typeof ArticleResponseSchema>;
export type ArticleDetailsResponse = z.infer<
  typeof ArticleDetailsResponseSchema
>;
