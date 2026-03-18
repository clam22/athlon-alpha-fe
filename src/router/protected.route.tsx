import { useAppSelector } from "@/store/hooks";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const isAutenticated = useAppSelector((state) => state.user.isAuthenticated);

  if (!isAutenticated) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
