import { api } from "./index";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const getDocContent = (category: string, filename: string) =>
  api<string>(`${baseUrl}/docs/${category}/${filename}`);
