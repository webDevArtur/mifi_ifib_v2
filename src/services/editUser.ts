import { api } from "./index";

interface EditUserData {
    lastName?: string;
    firstName?: string;
    middleName?: string;
    birthDate?: string;
    socialNetwork?: string;
    educationalStatus?: string;
    educationalFacility?: string;
    sphereOfInterest?: string;
  }
  
  export const editUser = (data: EditUserData): Promise<void> =>
    api("https://medphysicists.mephi.ru/api/v1/user/edit/", {
      method: "PATCH",
      data,
    });