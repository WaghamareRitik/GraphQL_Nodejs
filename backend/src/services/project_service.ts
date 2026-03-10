import { ProjectModel } from "../models/project_model";
import { CreateProjectDTO } from "../dto/createProject_dto";
import { UserModel } from "../models/user_model";

export class ProjectService {
  static async createProject(data: CreateProjectDTO) {
    const user = await UserModel.findById(data.createdBy);

    if (!user) {
      throw new Error("User does not exist");
    }

    return ProjectModel.create(
      data.name,
      data.description || "",
      data.createdBy,
    );
  }

  static async getProjects(limit: number, offset: number) {
    return ProjectModel.findAll(limit, offset);
  }

  static async getProject(id: string) {
    return ProjectModel.findById(id);
  }
}
