import { useQuery } from '@tanstack/react-query';

import { getTeamMembers } from 'services/teamMembers';
import { TeamMembersResponse } from 'entities';

import { techObjectsKeys } from './keys';

const teamMembersQuery = () => ({
  queryKey: [techObjectsKeys.mainVideo],
  queryFn: async () => getTeamMembers(),
});

export const useTeamMembers = () =>
  useQuery<TeamMembersResponse[]>({
    ...teamMembersQuery(),
    throwOnError: false,
  });
