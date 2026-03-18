import { Auth0Provider } from "@auth0/auth0-react";
import type { ReactNode } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <Auth0Provider
      domain="dev-4t0dh42mxpgd2z77.us.auth0.com"
      clientId="L0HanwszqybdcI12FfltKBn0gpMsjf66"
      authorizationParams={{
        redirect_uri: window.location.origin + "/dashboard",
        audience: "https://graph-api/",
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      {children}
    </Auth0Provider>
  );
}
