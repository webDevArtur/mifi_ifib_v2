import { api } from "./index";

const baseUrl = import.meta.env.VITE_BASE_URL;

interface RestorePasswordData {
  email: string;
}

export const restorePassword = (data: RestorePasswordData) =>
  api<null>(`${baseUrl}api/v1/user/auth/restore-password/`, {
    method: "POST",
    data,
  });
