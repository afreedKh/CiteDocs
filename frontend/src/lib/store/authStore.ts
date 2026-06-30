import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "../api/auth";

export type OtpPurpose = "signup" | "login" | "forgot-password";

interface PendingAuth {
  email: string;
  purpose: OtpPurpose;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;

  // Set right after signup/login, before OTP is verified.
  pendingAuth: PendingAuth | null;

  // Set after a forgot-password OTP is verified; lets ResetPasswordPage run.
  resetToken: string | null;

  setPendingAuth: (pending: PendingAuth) => void;
  clearPendingAuth: () => void;

  setResetToken: (token: string) => void;
  clearResetToken: () => void;

  setAuth: (user: AuthUser, accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      pendingAuth: null,
      resetToken: null,

      setPendingAuth: (pending) => set({ pendingAuth: pending }),
      clearPendingAuth: () => set({ pendingAuth: null }),

      setResetToken: (token) => set({ resetToken: token }),
      clearResetToken: () => set({ resetToken: null }),

      setAuth: (user, accessToken, refreshToken) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          pendingAuth: null,
        });
      },

      clearAuth: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
        pendingAuth: state.pendingAuth,
      }),
    },
  ),
);
