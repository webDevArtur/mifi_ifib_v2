import { api } from "./index";

const baseUrl = import.meta.env.VITE_BASE_URL;

export interface Section {
  name: string;
  link: string;
  subSections?: Section[];
}

export type SectionsResponse = Section[];

export const getSections = () => {
  const url = `${baseUrl}docs/sections`;

  return api<SectionsResponse>(url, {
    method: "GET",
  });
};
