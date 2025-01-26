import { useQuery } from "@tanstack/react-query";
import { getProgressStatistics } from "services/progressStatistics";
import { ProgressStatisticsResponse } from "entities";
import { techObjectsKeys } from "./keys";

const progressStatisticsQuery = () => ({
  queryKey: [techObjectsKeys.progressStatistics],
  queryFn: async () => getProgressStatistics(),
});

export const useProgressStatistics = () =>
  useQuery<ProgressStatisticsResponse>({
    ...progressStatisticsQuery(),
    throwOnError: false,
  });
