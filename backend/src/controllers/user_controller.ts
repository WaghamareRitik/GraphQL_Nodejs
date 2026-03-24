import { UserService } from "../services/user_service";

export const UserController = {
  getUsers(_: any, { limit, offset, search }: any) {
    return UserService.getUsers(limit, offset, search);
  },

  getUser(_: any, { id }: any) {
    return UserService.getUser(id);
  },

  createUser(_: any, { name, email }: any) {
    return UserService.createUser({ name, email });
  },
};
