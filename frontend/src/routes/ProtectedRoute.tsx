import { useAuth0 } from "@auth0/auth0-react";
import { useMe } from "../hooks/useMe";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }: any) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const { user, loading } = useMe();

  if (isLoading || loading) {
    return <p className="p-6">Loading...</p>;
  }

  if (!isAuthenticated) {
    loginWithRedirect();
    return null;
  }

  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/projects" replace />;
  }

  return children;
}
