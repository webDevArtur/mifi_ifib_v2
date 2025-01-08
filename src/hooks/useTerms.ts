import { useQuery } from "@tanstack/react-query";

import { getTerms } from "services/terms";
import { TermResponse } from "entities";

import { techObjectsKeys } from "./keys";

const termsQuery = (
  knowledgeBase?: string,
  startsWith?: string,
  name?: string,
  pageSize?: number,
  pageNumber?: number,
) => ({
  queryKey: [
    techObjectsKeys.terms,
    { knowledgeBase, startsWith, name, pageSize, pageNumber },
  ],
  queryFn: async () => getTerms(knowledgeBase, startsWith, name, pageSize, pageNumber),
});

export const useTerms = (
  knowledgeBase?: string,
  startsWith?: string,
  name?: string,
  pageSize?: number,
  pageNumber?: number,
) =>
  useQuery<TermResponse>({
    ...termsQuery(knowledgeBase, startsWith, name, pageSize, pageNumber),
    throwOnError: false,
  });
