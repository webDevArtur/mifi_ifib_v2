import { z } from "zod";

import { RegistrationResponseSchema } from "./registrationResponse";
import { ConfirmRegistrationResponseSchema } from "./confirmRegistrationResponse";
import { AuthResponseSchema } from "./authResponse";
import { ArticleResponseSchema } from "./articleResponse";
import { ArticleDetailsResponseSchema } from "./articleDetailsResponse";
import { mainVideoResponseSchema } from "./mainVideoResponse";
import { TeamMembersResponseSchema } from "./teamMembersResponse";
import { TermIdResponseSchema } from "./termIdResponse";
import { TermResponseSchema } from "./termResponse";

export type RegistrationResponse = z.infer<typeof RegistrationResponseSchema>;
export type ConfirmRegistrationResponse = z.infer<
  typeof ConfirmRegistrationResponseSchema
>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type ArticleResponse = z.infer<typeof ArticleResponseSchema>;
export type ArticleDetailsResponse = z.infer<
  typeof ArticleDetailsResponseSchema
>;
export type MainVideoResponse = z.infer<typeof mainVideoResponseSchema>;
export type TeamMembersResponse = z.infer<typeof TeamMembersResponseSchema>;
export type TermIdResponse = z.infer<typeof TermIdResponseSchema>;
export type TermResponse = z.infer<typeof TermResponseSchema>;
