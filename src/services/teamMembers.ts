import { api } from "./index";
import { TeamMembersResponse } from "entities/index";

export const getTeamMembers = () =>
  api<TeamMembersResponse[]>(
    `https://medphysicists.mephi.ru/api/v1/home/team-members`,
  );
