import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../lib/store/authStore";

const PublicRoute = () => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (isAuthenticated) {
    // Save where they were trying to go — redirect back after login
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default PublicRoute