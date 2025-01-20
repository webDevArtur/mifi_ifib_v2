import { api } from "./index";
import { PodcastResponse } from "entities/index";

export const getPodcasts = (
  page?: number,
  size?: number,
  search?: string,
  ids?: number[]
) => {
  const searchQuery = search ? `&search=${search}` : "";
  const idsQuery = ids && ids.length > 0 ? `&id=${ids.join(',')}` : "";

  const url = `https://medphysicists.mephi.ru/api/v1/nuclear-medicine-intro/podcasts?page=${page}&pageSize=${size}${searchQuery}${idsQuery}`;

  return api<PodcastResponse>(url, {
    method: "GET",
  });
};

export const podcastAsViewed = (podcastId: number) => 
  api<void>(`https://medphysicists.mephi.ru/api/v1/nuclear-medicine-intro/podcasts/${podcastId}/complete/`, {
    method: "POST",
  });