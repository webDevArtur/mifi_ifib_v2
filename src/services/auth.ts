import { api } from "./index";
import { AuthResponse } from "entities/index";

interface LoginData {
  username: string;
  password: string;
}

export const loginUser = (data: LoginData) =>
  api<AuthResponse>("https://cybernexvpn-stage.ru/api/v1/auth/login", {
    method: "POST",
    data,
  });
