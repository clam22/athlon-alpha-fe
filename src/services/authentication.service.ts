import baseHttpClient from "@/config/base-http-client.config";
import type {
  ConfirmAccountRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/interfaces/authentication.interface";

export const AuthenticationService = {
  login: async (request: LoginRequest): Promise<LoginResponse> => {
    const response = await baseHttpClient.post(
      "/api/authentication/signin",
      request,
    );
    return response.data;
  },

  register: async (request: RegisterRequest): Promise<RegisterResponse> => {
    const response = await baseHttpClient.post(
      "/api/authentication/signup",
      request,
    );
    return response.data;
  },

  confirmAccount: async (request: ConfirmAccountRequest): Promise<void> => {
    const response = await baseHttpClient.post(
      "/api/authentication/confirm-signup",
      request,
    );
    return response.data;
  },
};
