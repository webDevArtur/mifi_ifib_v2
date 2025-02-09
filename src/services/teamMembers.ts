import { api } from "./index";
import { TeamMembersResponse } from "entities/index";

export const getTeamMembers = () =>
  api<TeamMembersResponse[]>(
    `v1/home/team-members`,
  );
