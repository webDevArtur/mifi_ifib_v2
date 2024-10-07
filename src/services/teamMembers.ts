import { api } from './index';
import { TeamMembersResponse } from 'entities/index';

export const getTeamMembers = () => api<TeamMembersResponse[]>(`https://cybernexvpn-stage.ru/api/v1/home/team-members`);
