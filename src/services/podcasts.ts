import { api } from "./index";
import { PodcastResponse } from "entities/index";

export const getPodcasts = (
  page?: number,
  size?: number,
  search?: string,
  ids?: number[]
) => {
  const params = new URLSearchParams();

  if (page !== undefined) params.append("page", page.toString());
  if (size !== undefined) params.append("pageSize", size.toString());
  if (search) params.append("search", search);
  if (ids && ids.length > 0) {
    ids.forEach((idValue) => params.append("id", idValue.toString()));
  }

  const url = `https://medphysicists.mephi.ru/api/v1/nuclear-medicine-intro/podcasts?${params.toString()}`;

  return api<PodcastResponse>(url, {
    method: "GET",
  });
};

export const podcastAsViewed = (podcastId: number) => 
  api<void>(`https://medphysicists.mephi.ru/api/v1/nuclear-medicine-intro/podcasts/${podcastId}/complete/`, {
    method: "POST",
  });

export const markPodcast = (podcastId: number) =>
  api<void>(`https://medphysicists.mephi.ru/api/v1/nuclear-medicine-intro/podcasts/${podcastId}/mark/`, {
    method: "POST",
  });