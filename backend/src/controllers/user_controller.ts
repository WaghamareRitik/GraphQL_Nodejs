import { UserService } from "../services/user_service";
import { authMiddleware } from "../middleware/auth_middleware";

export const UserController = {
  getUsers(_: any, { limit, offset }: any, context: any) {
    authMiddleware(context);

    return UserService.getUsers(limit, offset);
  },

  getUser(_: any, { id }: any, context: any) {
    authMiddleware(context);

    return UserService.getUser(id);
  },

  createUser(_: any, { name, email }: any) {
    return UserService.createUser({ name, email });
  },
};
