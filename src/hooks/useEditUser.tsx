import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { editUser } from "services/editUser";

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

export const useEditUser = () => {
  return useMutation<void, AxiosError, EditUserData>({
    mutationFn: async (data) => {
      return editUser(data);
    },
    onError: (error) => {
      console.error("Edit user error:", error);
    },
  });
};
