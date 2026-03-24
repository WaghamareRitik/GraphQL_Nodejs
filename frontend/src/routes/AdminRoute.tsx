import { useMe } from "../hooks/useMe";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }: any) {
  const { user, loading } = useMe();

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" />;

  if (user.role !== "admin") {
    return <Navigate to="/projects" replace />;
  }

  return children;
}
