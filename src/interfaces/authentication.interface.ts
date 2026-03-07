export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  cognitoId: string;
  name: string;
  surname: string;
  email: string;
}

export interface RegisterRequest {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  session: string;
  userConfirmed: boolean;
}

export interface ConfirmAccountRequest {
  email: string;
  confirmationCode: string;
}
