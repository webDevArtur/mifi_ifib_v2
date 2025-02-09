import { api } from "./index";
import { VideoResponse } from "entities";

export const getVideos = (
  id?: number[],
  name?: string,
  page?: number,
  pageSize?: number,
  category?: string
) => {
  const queryParams = new URLSearchParams();

  if (id) queryParams.append("id", id.join(","));
  if (name) queryParams.append("name", name);
  if (page) queryParams.append("page", String(page));
  if (pageSize) queryParams.append("pageSize", String(pageSize));
  if (category) queryParams.append("category", category);

  const url = `v1/nuclear-medicine-intro/films?${queryParams.toString()}`;

  return api<VideoResponse>(url, {
    method: "GET",
  });
};

export const videoAsRead = (filmId: number) =>
  api<void>(`v1/nuclear-medicine-intro/films/${filmId}/complete/`, {
    method: "POST",
  });

export const markVideo = (videoId: number) =>
  api<void>(`v1/nuclear-medicine-intro/films/${videoId}/mark/`, {
    method: "POST",
  });
  