import { api } from "./index";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const deleteUser = (): Promise<void> =>
  api(`${baseUrl}api/v1/user/delete/`, {
    method: "DELETE",
  });
