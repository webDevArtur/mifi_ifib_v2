import { api } from "./index";

const baseUrl = import.meta.env.VITE_BASE_URL;

export interface HomeVideoResponse {
  url: string;
}

export const getHomeVideo = () =>
  api<HomeVideoResponse>(`${baseUrl}api/v1/home/home-video/`);
