import { api } from "./index";
import { AuthResponse } from "entities/index";

interface LoginData {
  username: string;
  password: string;
}

export const loginUser = (data: LoginData) =>
  api<AuthResponse>("https://medphysicists.mephi.ru/api/v1/user/auth/login", {
    method: "POST",
    data,
  });
