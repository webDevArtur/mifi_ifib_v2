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
  isOnline?: string,
  questCategory?: string
) => ({
  queryKey: [techObjectsKeys.quests, { page, size, complexity, questType, search, isOnline, questCategory }],
  queryFn: async () => getQuests(questType, page, size, complexity, search, isOnline, questCategory),
});

interface UseQuestsParams {
  questType?: string;
  page?: number;
  size?: number;
  complexity?: number;
  search?: string;
  isOnline?: string;
  questCategory?: string;
}

export const useQuests = ({
  questType,
  page,
  size,
  complexity,
  search,
  isOnline,
  questCategory,
}: UseQuestsParams) => {
  return useQuery(
    questsQuery(
      questType,
      page,
      size,
      complexity,
      search,
      isOnline,
      questCategory
    )
  );
};
