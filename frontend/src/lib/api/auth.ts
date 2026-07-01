import { apiClient } from "./client";

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
}

export interface PendingAuthResponse {
  id: string;
  fullName: string;
  email: string;
}

export interface VerifiedAuthResponse {
  id: string;
  fullName: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  fullName: string;
  email: string;
  password: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  resetToken: string;
  newPassword: string;
}

// Signup/login only trigger an OTP email — no session yet.
export async function signupApi(
  payload: SignupPayload,
): Promise<PendingAuthResponse> {
  const { data } = await apiClient.post<PendingAuthResponse>(
    "/auth/register",
    payload,
  );
  return data;
}

export async function loginApi(
  payload: LoginPayload,
): Promise<PendingAuthResponse> {
  const { data } = await apiClient.post<PendingAuthResponse>(
    "/auth/login",
    payload,
  );
  return data;
}

// These are the only calls that actually return tokens.
export async function verifySignupOtpApi(
  payload: VerifyOtpPayload,
): Promise<VerifiedAuthResponse> {
  const { data } = await apiClient.post<VerifiedAuthResponse>(
    "/auth/signup/verify",
    payload,
  );
  return data;
}

export async function verifyLoginOtpApi(
  payload: VerifyOtpPayload,
): Promise<VerifiedAuthResponse> {
  const { data } = await apiClient.post<VerifiedAuthResponse>(
    "/auth/login/verify",
    payload,
  );
  return data;
}

export async function forgotPasswordApi(
  payload: ForgotPasswordPayload,
): Promise<{ message: string }> {
  const { data } = await apiClient.post<{ message: string }>(
    "/auth/forgot-password",
    payload,
  );
  return data;
}

export async function verifyForgotPasswordOtpApi(
  payload: VerifyOtpPayload,
): Promise<{ resetToken: string }> {
  const { data } = await apiClient.post<{ resetToken: string }>(
    "/auth/forgot-password/verify",
    payload,
  );
  return data;
}

export async function resetPasswordApi(
  payload: ResetPasswordPayload,
): Promise<{ message: string }> {
  const { data } = await apiClient.post<{ message: string }>(
    "/auth/reset-password",
    payload,
  );
  return data;
}

export const googleLoginApi = async (idToken: string) => {
  const response = await apiClient.post("/auth/google", {
    idToken,
  });

  return response.data;
};
