import { TaskModel } from "../models/task_model";
import { ProjectModel } from "../models/project_model";
import { UserModel } from "../models/user_model";
import { validateStatus } from "../utils/validators";

export class TaskService {
  static async createTask(
    title: string,
    description: string,
    projectId: string,
    assignedTo?: string,
  ) {
    const project = await ProjectModel.findById(projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    if (assignedTo) {
      const user = await UserModel.findById(assignedTo);

      if (!user) {
        throw new Error("Assigned user not found");
      }
    }

    return TaskModel.create(title, description, projectId, assignedTo);
  }

  static async getTasks(
    limit: number,
    offset: number,
    status?: string,
    projectId?: string,
  ) {
    return TaskModel.findTasks(limit, offset, status, projectId);
  }

  static async updateTaskStatus(taskId: string, status: string) {
    validateStatus(status);

    return TaskModel.updateStatus(taskId, status);
  }

  static async deleteTask(taskId: string) {
    await TaskModel.delete(taskId);

    return true;
  }
}
