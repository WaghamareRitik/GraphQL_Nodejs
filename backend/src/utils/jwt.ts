import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secret";

export interface TokenPayload {
  userId: string;
}

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, SECRET) as TokenPayload;
};
