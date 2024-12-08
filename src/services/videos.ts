import { api } from "./index";
import { VideoResponse } from "entities";

export const getVideos = (id?: number[], name?: string, page: number = 1, pageSize: number = 20) => {
  const queryParams = new URLSearchParams();

  if (id) queryParams.append("id", id.join(","));
  if (name) queryParams.append("name", name);
  queryParams.append("page", String(page));
  queryParams.append("pageSize", String(pageSize));

  const url = `https://medphysicists.mephi.ru/api/v1/nuclear-medicine-intro/films?${queryParams.toString()}`;

  return api<VideoResponse>(url, {
    method: "GET",
  });
};
