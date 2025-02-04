import { api } from "./index";
import { QuestResponse } from "entities";

export const getQuests = (
  questType?: string,
  page?: number,
  size?: number,
  complexity?: number,
  search?: string,
  isOnline?: string
) => {
  const pageQuery = page ? `&page=${page}` : "";
  const sizeQuery = size ? `&pageSize=${size}` : "";
  const complexityQuery = complexity ? `&complexity=${complexity}` : "";
  const questTypeQuery = questType ? `&quest_type=${questType}` : "";
  const searchQuery = search ? `&search=${encodeURIComponent(search)}` : "";
  const isOnlineQuery =
    isOnline === "online"
      ? `&is_online=true`
      : isOnline === "offline"
      ? `&is_online=false`
      : "";

  const url = `https://medphysicists.mephi.ru/api/v1/quests?${pageQuery}${sizeQuery}${complexityQuery}${questTypeQuery}${searchQuery}${isOnlineQuery}`;

  return api<QuestResponse>(url, {
    method: "GET",
  });
};
