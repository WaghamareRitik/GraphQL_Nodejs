import { ProjectService } from "../services/project_service";
import { authMiddleware } from "../middleware/auth_middleware";

export const ProjectController = {
  async getProjects(_: any, { limit, offset }: any, context: any) {
    authMiddleware(context);

    return ProjectService.getProjects(limit, offset);
  },

  async getProject(_: any, { id }: any, context: any) {
    authMiddleware(context);

    return ProjectService.getProject(id);
  },

  async createProject(_: any, args: any, context: any) {
    const user = authMiddleware(context);

    args.createdBy = user.userId;

    return ProjectService.createProject(args);
  },
};
