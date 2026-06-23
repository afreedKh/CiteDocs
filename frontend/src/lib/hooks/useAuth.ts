import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginApi, signupApi, logoutApi, type LoginPayload, type SignupPayload } from "../api/auth";
import { useAuthStore } from "../store/authStore";

export function useLogin() {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginApi(payload),
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
      navigate("/dashboard");
    },
    onError: (error: any) => {
      console.error("Login failed:", error.response?.data?.message || error.message);
    },
  });
}

export function useSignup() {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: SignupPayload) => signupApi(payload),
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
      navigate("/dashboard");
    },
    onError: (error: any) => {
      console.error("Signup failed:", error.response?.data?.message || error.message);
    },
  });
}

export function useLogout() {
  const { clearAuth } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutApi,
    onSettled: () => {
      clearAuth();
      navigate("/login");
    },
  });
}