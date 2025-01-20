import { useQuery } from "@tanstack/react-query";
import { getUserRanks } from "services/userRanks";
import { UserRankResponse } from "entities";
import { techObjectsKeys } from "./keys";

const userRanksQuery = (status?: string) => ({
  queryKey: [techObjectsKeys.userRanks, { status }],
  queryFn: async () => getUserRanks(status),
});

export const useUserRanks = (status?: string) =>
  useQuery<UserRankResponse>({
    ...userRanksQuery(status),
    throwOnError: false,
  });
