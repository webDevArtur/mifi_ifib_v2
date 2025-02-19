import { api } from "./index";
import { PartnersResponse } from "entities";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const getPartners = () =>
  api<PartnersResponse[]>(`${baseUrl}api/v1/home/partners`);