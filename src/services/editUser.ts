import { api } from "./index";

interface EditUserData {
    lastName?: string;
    firstName?: string;
    middleName?: string;
    birthDate?: string;
    socialNetwork?: string;
    educationalFacility?: string;
    sphereOfInterest?: string;
    role?: string;
  }
  
  export const editUser = (data: EditUserData): Promise<void> =>
    api("https://medphysicists-stage.ru/api/v1/user/edit/", {
      method: "PATCH",
      data,
    });