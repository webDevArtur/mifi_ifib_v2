import { api } from "./index";
import { UserRankResponse } from "entities";

export const getUserRanks = (status?: string) => {
  const statusQuery = status ? `?status=${status}` : "";

  const url = `https://medphysicists.mephi.ru/api/v1/user/rank/${statusQuery}`;

  return api<UserRankResponse>(url, {
    method: "GET",
  });
};
