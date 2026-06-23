import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { LoginPage } from "../pages/auth/LoginPage";
import { SignupPage } from "../pages/auth/SignupPage";
import { DashboardPage } from "../pages/dashboard/DashboardPage";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  {
    element: <ProtectedRoute />,      // auth guard
    children: [
      {
        element: <AppLayout />,       // shared shell for logged-in pages
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/", element: <DashboardPage /> },
        ],
      },
    ],
  },
]);