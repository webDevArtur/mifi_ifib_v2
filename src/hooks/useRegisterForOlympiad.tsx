import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { registerForOlympiad } from "services/registerForOlympiad";

export const useRegisterForOlympiad = () => {
  return useMutation<void, AxiosError>({
    mutationFn: registerForOlympiad,
    onError: (error) => {
      console.error("Olympiad registration error:", error);
    },
  });
};
