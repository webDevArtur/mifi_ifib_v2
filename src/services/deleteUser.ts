import { api } from "./index";

export const deleteUser = (): Promise<void> =>
  api("https://medphysicists-stage.ru/api/v1/user/delete/", {
    method: "DELETE",
  });
