import { useMutation } from '@tanstack/react-query';
import { loginUser } from 'services/auth';
import { AuthResponse } from 'entities/index';

export const useLogin = () => {
  return useMutation<
    AuthResponse,
    Error,
    { username: string; password: string }
  >({
    mutationFn: async (data) => {
      return loginUser(data);
    },
    onError: (error) => {
      console.error('Auth error:', error);
    },
  });
};
