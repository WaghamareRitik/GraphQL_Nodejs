import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

interface AuthPayload extends JwtPayload {
  userId: string;
}

export const authMiddleware = (context: any): AuthPayload => {
  const authHeader = context.req.headers.authorization;

  if (!authHeader) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.replace("Bearer ", "");

  const decoded = verifyToken(token) as AuthPayload;

  return decoded;
};
