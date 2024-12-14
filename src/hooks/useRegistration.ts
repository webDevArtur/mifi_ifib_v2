import { useMutation } from "@tanstack/react-query";
import {
  registerUser,
  resendConfirmationCode,
  confirmRegistration,
} from "services/registration";
import {
  RegistrationResponse,
  ConfirmRegistrationResponse,
} from "entities/index";
import { AxiosError } from "axios";

interface RegisterData {
  lastName: string;
  firstName: string;
  middleName?: string | null;
  birthDate: string;
  email: string;
  socialNetwork: string;
  educationalStatus?: string | null;
  educationalFacility?: string | null;
  sphereOfInterest?: string | null;
  password: string;
  passwordConfirmation: string;
}

export const useRegister = () => {
  return useMutation<RegistrationResponse, AxiosError, RegisterData>({
    mutationFn: async (data) => {
      return registerUser(data);
    },
    onError: (error) => {
      console.error("Registration error:", error);
    },
  });
};

export const useConfirmRegistration = () => {
  return useMutation<
    ConfirmRegistrationResponse,
    Error,
    { confirmation_сode: string; register_token: string }
  >({
    mutationFn: async (data) => {
      return confirmRegistration(data);
    },
    onError: (error) => {
      console.error("Confirmation error:", error);
    },
  });
};

export const useResendConfirmationCode = () => {
  return useMutation<void, Error, { register_token: string }>({
    mutationFn: async (data) => {
      await resendConfirmationCode(data);
    },
    onError: (error) => {
      console.error("Resend confirmation code error:", error);
    },
  });
};
