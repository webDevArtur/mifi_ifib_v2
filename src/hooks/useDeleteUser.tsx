import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { deleteUser } from "services/deleteUser";

export const useDeleteUser = () => {
  return useMutation<void, AxiosError>({
    mutationFn: async () => {
      return deleteUser();
    },
    onError: (error) => {
      console.error("Delete user error:", error);
    },
  });
};
