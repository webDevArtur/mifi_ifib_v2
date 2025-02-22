import { api } from "./index";

const baseUrl = import.meta.env.VITE_BASE_URL;

interface UpdatePasswordData {
  uuid: string;
  password: string;
}

export const updatePassword = async (data: UpdatePasswordData): Promise<void> => {
  await api(`${baseUrl}api/v1/user/auth/update-password/`, {
    method: "POST",
    data,
  });
};
