import { ProjectService } from "../services/project_service";

export const ProjectController = {
  async getProjects(_: any, { limit, offset }: any) {
    return ProjectService.getProjects(limit, offset);
  },

  async getProject(_: any, { id }: any) {
    return ProjectService.getProject(id);
  },

  async createProject(_: any, args: any, context: any) {
    const user = context.user;

    if (!user) throw new Error("Unauthorized");

    return ProjectService.createProject({
      ...args,
      createdBy: user.id,
    });
  },
};
