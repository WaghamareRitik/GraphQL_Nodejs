import { ApolloProvider } from "@apollo/client/react";
import { useAuth0 } from "@auth0/auth0-react";
import { createApolloClient } from "./apolloClient";
import { useMemo } from "react";

export default function ApolloProviderWithAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const client = useMemo(() => {
    return createApolloClient(async () => {
      if (!isAuthenticated) return null;

      try {
        return await getAccessTokenSilently();
      } catch {
        return null;
      }
    });
  }, [getAccessTokenSilently, isAuthenticated]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
