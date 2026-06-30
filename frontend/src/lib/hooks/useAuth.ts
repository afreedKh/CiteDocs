import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  forgotPasswordApi,
  loginApi,
  logoutApi,
  resetPasswordApi,
  signupApi,
  verifyForgotPasswordOtpApi,
  verifyLoginOtpApi,
  verifySignupOtpApi,
  type AuthUser,
  type ForgotPasswordPayload,
  type LoginPayload,
  type ResetPasswordPayload,
  type SignupPayload,
  type VerifyOtpPayload,
} from "../api/auth";
import { useAuthStore } from "../store/authStore";

// --- Signup: triggers an OTP email, no session yet ---
export function useSignup() {
  const { setPendingAuth } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: SignupPayload) => signupApi(payload),
    onSuccess: (data) => {
      setPendingAuth({ email: data.email, purpose: "signup" });
      navigate("/verify-otp");
    },
  });
}

// --- Login: triggers an OTP email, no session yet ---
export function useLogin() {
  const { setPendingAuth } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginApi(payload),
    onSuccess: (data) => {
      setPendingAuth({ email: data.email, purpose: "login" });
      navigate("/verify-otp");
    },
    onError: (error: any, variables) => {
      // Account exists + password correct, but email was never verified.
      // The backend already resent a signup OTP — just route the user
      // to verification instead of leaving them stuck on a dead-end error.
      if (error?.response?.data?.requiresVerification) {
        setPendingAuth({ email: variables.email, purpose: "signup" });
        navigate("/verify-otp");
      }
    },
  });
}

// --- Verify OTP: this is the only step that actually creates a session ---
export function useVerifyOtp() {
  const { pendingAuth, setAuth } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (otp: string) => {
      if (!pendingAuth) {
        throw new Error("No pending signup/login to verify");
      }

      const payload: VerifyOtpPayload = { email: pendingAuth.email, otp };

      return pendingAuth.purpose === "signup"
        ? verifySignupOtpApi(payload)
        : verifyLoginOtpApi(payload);
    },
    onSuccess: (data) => {
      const user: AuthUser = {
        id: data.id,
        fullName: data.fullName,
        email: data.email,
      };
      setAuth(user, data.accessToken, data.refreshToken);
      navigate("/dashboard");
    },
  });
}

// --- Forgot password: step 1, send OTP ---
export function useForgotPassword() {
  const { setPendingAuth } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) => forgotPasswordApi(payload),
    onSuccess: (_data, variables) => {
      setPendingAuth({ email: variables.email, purpose: "forgot-password" });
      navigate("/verify-forgot-password-otp");
    },
  });
}

// --- Forgot password: step 2, verify OTP, get a short-lived reset token ---
export function useVerifyForgotPasswordOtp() {
  const { pendingAuth, setResetToken, clearPendingAuth } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (otp: string) => {
      if (!pendingAuth) {
        throw new Error("No pending password reset to verify");
      }
      return verifyForgotPasswordOtpApi({ email: pendingAuth.email, otp });
    },
    onSuccess: (data) => {
      setResetToken(data.resetToken);
      clearPendingAuth();
      navigate("/reset-password");
    },
  });
}

// --- Forgot password: step 3, set the new password ---
export function useResetPassword() {
  const { resetToken, clearResetToken } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (newPassword: string) => {
      if (!resetToken) {
        throw new Error("No reset token — verify the OTP again");
      }
      const payload: ResetPasswordPayload = { resetToken, newPassword };
      return resetPasswordApi(payload);
    },
    onSuccess: () => {
      clearResetToken();
      navigate("/login");
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
