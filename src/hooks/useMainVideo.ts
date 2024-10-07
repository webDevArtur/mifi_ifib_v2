import { useQuery } from '@tanstack/react-query';

import { getMainVideo } from 'services/mainVideo';
import { MainVideoResponse } from 'entities';

import { techObjectsKeys } from './keys';

const mainVideoQuery = () => ({
  queryKey: [techObjectsKeys.mainVideo],
  queryFn: async () => getMainVideo(),
});

export const useMainVideo = () =>
  useQuery<MainVideoResponse>({
    ...mainVideoQuery(),
    throwOnError: false,
  });
