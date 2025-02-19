import { api } from "./index";

const baseUrl = import.meta.env.VITE_BASE_URL;

export interface QuestTypeDescription {
    questType: string;
    description: string;
  }

export const getQuestTypes = (questCategory?: string, questType?: string) => {
  const params = new URLSearchParams();

  if (questCategory) params.append("quest_category", questCategory);
  if (questType) params.append("quest_type", questType);

  return api<QuestTypeDescription[]>(
    `${baseUrl}api/v1/quests/types/?${params.toString()}`
  );
};