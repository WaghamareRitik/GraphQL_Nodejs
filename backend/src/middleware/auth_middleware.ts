import { expressjwt } from "express-jwt";
import jwksRsa from "jwks-rsa";

// 🔐 Auth0 config
const AUTH0_DOMAIN = "dev-4t0dh42mxpgd2z77.us.auth0.com"; // e.g. dev-abc123.us.auth0.com
const AUTH0_AUDIENCE = "https://graph-api/";

export const authMiddleware = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
  }) as any,

  audience: AUTH0_AUDIENCE,
  issuer: `https://${AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});
