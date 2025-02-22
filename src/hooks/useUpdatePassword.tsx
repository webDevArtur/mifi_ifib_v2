import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { updatePassword } from "services/updatePasswordService";

interface UpdatePasswordData {
  uuid: string;
  password: string;
}

export const useUpdatePassword = () => {
  return useMutation<void, Error, UpdatePasswordData>({
    mutationFn: async (data) => {
      return updatePassword(data);
    },
    onSuccess: () => {
      message.success("Пароль успешно изменен");
    },
    onError: (error) => {
      message.error(error.message || "Ошибка при смене пароля");
    },
  });
};
