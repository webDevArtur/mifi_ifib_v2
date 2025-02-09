import { api } from "./index";

export const deleteUser = (): Promise<void> =>
  api("v1/user/delete/", {
    method: "DELETE",
  });
