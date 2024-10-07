import { useQuery } from '@tanstack/react-query';

import { getEquipments } from 'services/equipments';
import { ArticleResponse } from 'entities';

import { techObjectsKeys } from './keys';

const equipmentsQuery = (page: number, size: number, search?: string) => ({
  queryKey: [techObjectsKeys.articles, { page, size, search }],
  queryFn: async () => getEquipments(page, size, search),
});

export const useEquipments = (page: number, size: number, search?: string) =>
  useQuery<ArticleResponse>({
    ...equipmentsQuery(page, size, search),
    throwOnError: false,
  });
