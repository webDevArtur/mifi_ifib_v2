import { api } from "./index";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const getLetters = (knowledgeBase?: string) => {
  const params = new URLSearchParams();

  if (knowledgeBase) params.append("knowledge_base", knowledgeBase);

  return api<{
    english: string[];
    russian: string[];
  }>(`${baseUrl}api/v1/knowledge-base/terms/letters/?${params.toString()}`);
};
