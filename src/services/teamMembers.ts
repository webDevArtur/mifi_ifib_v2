import { api } from "./index";
import { TeamMembersResponse } from "entities/index";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const getTeamMembers = () =>
  api<TeamMembersResponse[]>(
    `${baseUrl}api/v1/home/team-members`,
  );
