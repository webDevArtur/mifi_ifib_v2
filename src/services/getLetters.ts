import { api } from "./index";

export const getLetters = (knowledgeBase?: string) => {
  const params = new URLSearchParams();

  if (knowledgeBase) params.append("knowledge_base", knowledgeBase);

  return api<{
    english: string[];
    russian: string[];
  }>(`v1/knowledge-base/terms/letters/?${params.toString()}`);
};
