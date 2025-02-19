import { useQuery } from "@tanstack/react-query";
import { getQuestTypes, QuestTypeDescription } from "services/getQuestTypes";

const questTypesQuery = (questCategory?: string, questType?: string) => ({
  queryKey: ['questTypes', { questCategory, questType }],
  queryFn: async () => getQuestTypes(questCategory, questType),
});

export const useQuestTypes = (questCategory?: string, questType?: string) =>
  useQuery<QuestTypeDescription[]>({
    ...questTypesQuery(questCategory, questType),
    throwOnError: false,
  });