import { api } from "./index";

const baseUrl = import.meta.env.VITE_BASE_URL;

export interface TaskResponse {
  knowledgeBase: string;
  url: string;
}

export const getTasks = (knowledgeBase?: string) => {
  const params = new URLSearchParams();

  if (knowledgeBase) params.append("knowledge_base", knowledgeBase);

  return api<TaskResponse[]>(
    `${baseUrl}api/v1/knowledge-base/tasks/?${params.toString()}`
  );
};
