import { apiClient } from "./client";

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
}

export interface AuthResponse {
  user: AuthUser;
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

export async function loginApi(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>("/auth/login", payload);
  return data;
}

export async function signupApi(payload: SignupPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>("/auth/signup", payload);
  return data;
}

export async function logoutApi(): Promise<void> {
  await apiClient.post("/auth/logout");
}