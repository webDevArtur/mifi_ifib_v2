import { useMutation } from "@tanstack/react-query";
import { restorePassword } from "services/restorePasswordService";

export const useRestorePassword = () => {
  return useMutation<null, Error, { email: string }>({
    mutationFn: async (data) => {
      return restorePassword(data);
    },
    onError: (error) => {
      console.error("Restore password error:", error);
    },
  });
};
