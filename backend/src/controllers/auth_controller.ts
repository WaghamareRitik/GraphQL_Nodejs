import { AuthService } from "../services/auth_service";

export const AuthController = {
  signup: async (_: any, args: any) => {
    return AuthService.signup(args.name, args.email, args.password);
  },

  login: async (_: any, args: any) => {
    return AuthService.login(args.email, args.password);
  },
};
