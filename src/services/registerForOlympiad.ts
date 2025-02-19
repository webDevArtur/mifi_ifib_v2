import { api } from "./index";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const registerForOlympiad = (): Promise<void> => {
  return api(`${baseUrl}api/v1/user/register-for-olympiad/`, {
    method: "POST",
  });
};
