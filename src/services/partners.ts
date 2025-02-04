import { api } from "./index";
import { PartnersResponse } from "entities";

export const getPartners = () =>
  api<PartnersResponse[]>(`https://medphysicists-stage.ru/api/v1/home/partners`);