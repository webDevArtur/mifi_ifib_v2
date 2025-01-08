import { z } from "zod";

import { RegistrationResponseSchema } from "./registrationResponse";
import { ConfirmRegistrationResponseSchema } from "./confirmRegistrationResponse";
import { AuthResponseSchema } from "./authResponse";
import { ArticleResponseSchema } from "./articleResponse";
import { mainVideoResponseSchema } from "./mainVideoResponse";
import { TeamMembersResponseSchema } from "./teamMembersResponse";
import { TermResponseSchema } from "./termResponse";
import { CurrentUserSchema } from "./currentUserResponse";
import { VideoResponseSchema } from "./videoResponse";
import { EquipmentResponseSchema } from "./equipmentResponse";
import { PodcastResponseSchema } from "./podcastResponse";
import { PracticeResponseSchema } from "./practiceResponse";
import { EquipmentGroupsResponse } from "./equipmentGroupsResponse";
import { QuestResponseSchema } from "./QuestResponse";
import { QuestTasksResponseSchema } from "./questTasksResponse";

export type RegistrationResponse = z.infer<typeof RegistrationResponseSchema>;
export type ConfirmRegistrationResponse = z.infer<
  typeof ConfirmRegistrationResponseSchema
>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type ArticleResponse = z.infer<typeof ArticleResponseSchema>;
export type MainVideoResponse = z.infer<typeof mainVideoResponseSchema>;
export type TeamMembersResponse = z.infer<typeof TeamMembersResponseSchema>;
export type TermResponse = z.infer<typeof TermResponseSchema>;
export type CurrentUserResponse = z.infer<typeof CurrentUserSchema>;
export type VideoResponse = z.infer<typeof VideoResponseSchema>;
export type EquipmentResponse = z.infer<typeof EquipmentResponseSchema>;
export type PodcastResponse = z.infer<typeof PodcastResponseSchema>;
export type PracticeResponse = z.infer<typeof PracticeResponseSchema>;
export type EquipmentGroupsResponse = z.infer<
  typeof EquipmentGroupsResponse
>;
export type QuestResponse = z.infer<typeof QuestResponseSchema>;
export type QuestTasksResponse = z.infer<typeof QuestTasksResponseSchema>;
