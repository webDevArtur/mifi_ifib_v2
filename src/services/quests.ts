import { api } from "./index";
import { QuestResponse } from "entities";

const baseUrl = import.meta.env.VITE_BASE_URL;

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

  const url = `${baseUrl}api/v1/quests?${pageQuery}${sizeQuery}${complexityQuery}${questTypeQuery}${searchQuery}${isOnlineQuery}`;

  return api<QuestResponse>(url, {
    method: "GET",
  });
};
