import { api } from "./index";
import { PartnersResponse } from "entities";

export const getPartners = () =>
  api<PartnersResponse[]>(`https://medphysicists.mephi.ru/api/v1/home/partners`);