import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { LoginPage } from "../pages/auth/LoginPage";
import { SignupPage } from "../pages/auth/SignupPage";
import { VerifyOtpPage } from "../pages/auth/VerifyOtpPage";
import { ForgotPasswordPage } from "../pages/auth/ForgotPasswordPage";
import { VerifyForgotPasswordOtpPage } from "../pages/auth/VerifyForgotPasswordOtpPage";
import { ResetPasswordPage } from "../pages/auth/ResetPasswordPage";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { DocumentsPage } from "../pages/documents/DocumentsPage";
import PublicRoute from "./PublicRoute";
import LandingPage from "../pages/Home/LandingPage";

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/verify-otp", element: <VerifyOtpPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
      {
        path: "/verify-forgot-password-otp",
        element: <VerifyForgotPasswordOtpPage />,
      },
      { path: "/reset-password", element: <ResetPasswordPage /> },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/documents", element: <DocumentsPage /> },
        ],
      },
    ],
  },
]);
