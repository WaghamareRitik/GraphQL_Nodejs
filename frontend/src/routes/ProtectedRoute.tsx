import { useAuth0 } from "@auth0/auth0-react";

export default function ProtectedRoute({ children }: any) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  // While Auth0 is checking session
  if (isLoading) {
    return <p className="p-6">Loading...</p>;
  }

  // If not logged in → redirect to Auth0
  if (!isAuthenticated) {
    loginWithRedirect();
    return null;
  }

  // If logged in → allow access
  return children;
}
