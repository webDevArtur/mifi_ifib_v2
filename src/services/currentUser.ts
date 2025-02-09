import { api } from "./index";
import { CurrentUserResponse } from "entities";

export const getCurrentUser = () =>
  api<CurrentUserResponse>(`https://medphysicists.mephi.ru/api/v1/user/current-user/`);
