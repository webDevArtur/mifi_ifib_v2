import { api } from "./index";

export const registerForOlympiad = (): Promise<void> => {
  return api("https://medphysicists-stage.ru/api/v1/user/register-for-olympiad/", {
    method: "POST",
  });
};
