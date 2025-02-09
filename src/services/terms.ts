import { api } from "./index";
import { TermResponse } from "entities/index";

export const getTerms = (
  knowledgeBase?: string,
  startsWith?: string,
  name?: string,
  pageSize?: number,
  pageNumber?: number
) => {
  const params = new URLSearchParams();

  if (knowledgeBase) params.append("knowledge_base", knowledgeBase);
  if (startsWith) params.append("starts_with", startsWith);
  if (name) params.append("name", name);
  if (pageSize) params.append("pageSize", pageSize.toString());
  if (pageNumber) params.append("page", pageNumber.toString());

  return api<TermResponse>(
    `v1/knowledge-base/terms/?${params.toString()}`
  );
};