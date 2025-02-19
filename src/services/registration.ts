import { api } from "./index";
import {
  RegistrationResponse,
  ConfirmRegistrationResponse,
} from "entities/index";

const baseUrl = import.meta.env.VITE_BASE_URL;

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
    `${baseUrl}api/v1/user/auth/register`,
    {
      method: "POST",
      data,
    },
  );

export const confirmRegistration = async (data: {
  confirmationCode: string;
}) => {
  return api<ConfirmRegistrationResponse>(
    `${baseUrl}api/v1/user/auth/register/confirm`,
    {
      method: "POST",
      data,
    },
  );
};

export const resendConfirmationCode = (data: { register_token?: string }) =>
  api(`${baseUrl}api/v1/user/auth/update-confirmation-code`, {
    method: "POST",
    data,
  });
