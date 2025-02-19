import { api } from "./index";
import { UserRankResponse } from "entities";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const getUserRanks = (status?: string) => {
  const statusQuery = status ? `?status=${status}` : "";

  const url = `${baseUrl}api/v1/user/rank/${statusQuery}`;

  return api<UserRankResponse>(url, {
    method: "GET",
  });
};
