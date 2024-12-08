import { api } from "./index";
import { PracticeResponse } from "entities/index";

export const getPractices = (
  id?: number[],
  practiceGroup?: string[]
) => {
  const params = new URLSearchParams();

  if (id && id.length > 0) {
    id.forEach((idValue) => params.append("id", idValue.toString()));
  }
  if (practiceGroup && practiceGroup.length > 0) {
    practiceGroup.forEach((group) => params.append("practice_group", group));
  }

  const url = `https://medphysicists.mephi.ru/api/v1/practice/?${params.toString()}`;

  return api<PracticeResponse[]>(url, {
    method: "GET",
  });
};
