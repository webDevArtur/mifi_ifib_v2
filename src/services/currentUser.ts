import { api } from "./index";
import { CurrentUserResponse } from "entities";

export const getCurrentUser = () =>
  api<CurrentUserResponse>(`v1/user/current-user/`);
