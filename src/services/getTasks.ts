import { api } from "./index";

export interface TaskResponse {
  knowledgeBase: string;
  url: string;
}

export const getTasks = (knowledgeBase?: string) => {
  const params = new URLSearchParams();

  if (knowledgeBase) params.append("knowledge_base", knowledgeBase);

  return api<TaskResponse[]>(
    `v1/knowledge-base/tasks/?${params.toString()}`
  );
};
