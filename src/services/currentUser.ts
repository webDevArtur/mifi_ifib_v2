import { api } from "./index";
import { CurrentUserResponse } from "entities";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const getCurrentUser = () =>
  api<CurrentUserResponse>(`${baseUrl}api/v1/user/current-user/`);
