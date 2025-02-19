import { api } from "./index";

const baseUrl = import.meta.env.VITE_BASE_URL;

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
    api(`${baseUrl}api/v1/user/edit/`, {
      method: "PATCH",
      data,
    });