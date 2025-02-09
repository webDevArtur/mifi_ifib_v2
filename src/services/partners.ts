import { api } from "./index";
import { PartnersResponse } from "entities";

export const getPartners = () =>
  api<PartnersResponse[]>(`v1/home/partners`);