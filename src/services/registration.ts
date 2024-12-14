import { api } from "./index";
import {
  RegistrationResponse,
  ConfirmRegistrationResponse,
} from "entities/index";

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

export const registerUser = (data: RegisterData) =>
  api<RegistrationResponse>(
    "https://medphysicists.mephi.ru/api/v1/user/auth/register",
    {
      method: "POST",
      data,
    },
  );

export const confirmRegistration = async (data: {
  confirmation_сode?: string;
  register_token?: string;
}) => {
  return api<ConfirmRegistrationResponse>(
    "https://medphysicists.mephi.ru/api/v1/user/auth/register/confirm",
    {
      method: "POST",
      data,
    },
  );
};

export const resendConfirmationCode = (data: { register_token?: string }) =>
  api("https://medphysicists.mephi.ru/api/v1/user/auth/update-confirmation-code", {
    method: "POST",
    data,
  });
