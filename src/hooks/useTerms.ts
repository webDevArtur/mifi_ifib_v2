import { useQuery } from "@tanstack/react-query";

import { getTermsIdByType, getTerms } from "services/terms";
import { TermIdResponse, TermResponse } from "entities";

import { techObjectsKeys } from "./keys";

const termsIdQuery = (type?: string) => ({
  queryKey: [techObjectsKeys.terms, type],
  queryFn: async () => getTermsIdByType(type),
});

export const useTermsIdByType = (type?: string) =>
  useQuery<TermIdResponse>({
    ...termsIdQuery(type),
    throwOnError: false,
  });

const termsQuery = (
  id?: number,
  startsWith?: string,
  name?: string,
  pageSize?: number,
  pageNumber?: number,
) => ({
  queryKey: [
    techObjectsKeys.terms,
    { id, startsWith, name, pageSize, pageNumber },
  ],
  queryFn: async () => getTerms(id, startsWith, name, pageSize, pageNumber),
});

export const useTerms = (
  id?: number,
  startsWith?: string,
  name?: string,
  pageSize?: number,
  pageNumber?: number,
) =>
  useQuery<TermResponse>({
    ...termsQuery(id, startsWith, name, pageSize, pageNumber),
    throwOnError: false,
  });
