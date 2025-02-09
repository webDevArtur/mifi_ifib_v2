import { api } from "./index";
import { AuthResponse } from "entities/index";

interface LoginData {
  username: string;
  password: string;
}

export const loginUser = (data: LoginData) =>
  api<AuthResponse>("v1/user/auth/login", {
    method: "POST",
    data,
  });

  
  const key = "authToken";
  const refreshKey = "refreshToken";

  const setAccessToken = (token: string) => {
    localStorage.setItem(key, token);
  };
  
  const getRefreshToken = (): string => {
    const token = localStorage.getItem(refreshKey);
    if (token) {
      return token;
    }
    throw new Error("Рефреш токен отсутствует");
  };
  
export const refreshToken = async (): Promise<string> => {
    try {
      const response = await api<{ accessToken: string }>("v1/user/auth/token/refresh", {
        method: "POST",
        data: { refresh: getRefreshToken() },
      });
      const { accessToken } = response;
      setAccessToken(accessToken);
      return accessToken;
    } catch (error) {
      // localStorage.removeItem(key);
      // localStorage.removeItem(refreshKey);
      // window.location.href = "/login";
      throw new Error("Необходимо авторизоваться");
    }
  };
