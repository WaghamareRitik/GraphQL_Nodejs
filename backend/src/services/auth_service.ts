import bcrypt from "bcrypt";
import { UserModel } from "../models/user_model";
import { generateToken } from "../utils/jwt";

export class AuthService {
  static async signup(name: string, email: string, password: string) {
    const existing = await UserModel.findByEmail(email);

    if (existing) {
      throw new Error("Email already Exists");
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await UserModel.create(name, email, hashed);

    const token = generateToken (user.id);
    return { token, user };
  }

  static async login(email: string, password: string) {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error("Invalid Credentails");
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid Credentails");
    }
    const token = generateToken (user.id);
    return { token, user };
  }
}
