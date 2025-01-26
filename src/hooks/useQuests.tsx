import { useQuery } from "@tanstack/react-query";
import { getQuests } from "services/quests";
import { QuestResponse } from "entities";
import { techObjectsKeys } from "./keys";

const questsQuery = (
  questType?: string,
  page?: number,
  size?: number,
  complexity?: number,
  search?: string,
  isOnline?: string
) => ({
  queryKey: [techObjectsKeys.quests, { page, size, complexity, questType, search, isOnline }],
  queryFn: async () => getQuests(questType, page, size, complexity, search, isOnline),
});

export const useQuests = (
  questType?: string,
  page?: number,
  size?: number,
  complexity?: number,
  search?: string,
  isOnline?: string
) => {
  return useQuery(questsQuery(questType, page, size, complexity, search, isOnline));
};
