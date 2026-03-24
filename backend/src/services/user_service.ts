import { UserModel } from "../models/user_model";

export class UserService {
  static async createUser(data: any) {
    const existing = await UserModel.findByEmail(data.email);

    if (existing) {
      throw new Error("Email already exists");
    }

    return UserModel.create(data.name, data.email, data.password);
  }

  // ✅ ADD search
  static async getUsers(limit: number, offset: number, search?: string) {
    return UserModel.findAll(limit, offset, search);
  }

  static async getUser(id: string) {
    return UserModel.findById(id);
  }
}
