import { UserModel } from "../models/user_model";
import { CreateUserDTO } from "../dto/createUser_dto";

export class UserService {
  static async createUser(data: CreateUserDTO) {
    const existing = await UserModel.findByEmail(data.email);

    if (existing) {
      throw new Error("Email already exists");
    }

    return UserModel.create(data.name, data.email);
  }

  static async getUsers(limit: number, offset: number) {
    return UserModel.findAll(limit, offset);
  }

  static async getUser(id: string) {
    return UserModel.findById(id);
  }
}
