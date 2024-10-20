import { api } from "./index";
import { TermIdResponse, TermResponse } from "entities/index";

export const getTermsIdByType = (type?: string) =>
  api<TermIdResponse>(
    `https://cybernexvpn-stage.ru/api/v1/knowledge-base?name=${type}`,
  );

export const getTerms = (
  id?: number,
  startsWith?: string,
  name?: string,
  pageSize?: number,
  pageNumber?: number,
) => {
  const startsWithQuery = startsWith ? `&startsWith=${startsWith}` : "";
  const nameQuery = name ? `&name=${name}` : "";
  const pageSizeQuery = pageSize ? `&pageSize=${pageSize}` : "";
  const pageNumberQuery = pageNumber ? `&pageNumber=${pageNumber}` : "";

  return api<TermResponse>(
    `https://cybernexvpn-stage.ru/api/v1/knowledge-base/${id}/terms?${startsWithQuery}${nameQuery}${pageSizeQuery}${pageNumberQuery}`,
  );
};
