import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../lib/store/authStore";

export function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    // Save where they were trying to go — redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}