import { useQuery } from "@tanstack/react-query";
import { getQuests } from "services/quests";
import { QuestResponse } from "entities";
import { techObjectsKeys } from "./keys";

const questsQuery = (questType?: string, page?: number, size?: number, complexity?: number, search?: string) => ({
  queryKey: [techObjectsKeys.quests, { page, size, complexity, questType, search }],
  queryFn: async () => getQuests(questType, page, size, complexity, search),
});

export const useQuests = (
  questType?: string,
  page?: number,
  size?: number,
  complexity?: number,
  search?: string
) => useQuery<QuestResponse>({
  ...questsQuery(questType, page, size, complexity, search),
  throwOnError: false,
});
