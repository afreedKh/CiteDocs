import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { LoginPage } from "../pages/auth/LoginPage";
import { SignupPage } from "../pages/auth/SignupPage";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { DocumentsPage } from "../pages/documents/DocumentsPage";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "/", element: <DashboardPage /> },
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/documents", element: <DocumentsPage /> },
        ],
      },
    ],
  },
]);