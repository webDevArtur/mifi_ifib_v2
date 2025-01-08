import { api } from "./index";
import { QuestResponse } from "entities";

export const getQuests = (
  questType?: string,
  page?: number,
  size?: number,
  complexity?: number,
  search?: string
) => {
  const pageQuery = page ? `&page=${page}` : "";
  const sizeQuery = size ? `&pageSize=${size}` : "";
  const complexityQuery = complexity ? `&complexity=${complexity}` : "";
  const questTypeQuery = questType ? `&quest_type=${questType}` : "";
  const searchQuery = search ? `&search=${encodeURIComponent(search)}` : "";

  const url = `https://medphysicists.mephi.ru/api/v1/quests?${pageQuery}${sizeQuery}${complexityQuery}${questTypeQuery}${searchQuery}`;

  return api<QuestResponse>(url, {
    method: "GET",
  });
};
