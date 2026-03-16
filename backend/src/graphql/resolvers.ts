import { UserController } from "../controllers/user_controller";
import { ProjectController } from "../controllers/project_controller";
import { TaskController } from "../controllers/task_controller";
import { AuthController } from "../controllers/auth_controller";

import { UserModel } from "../models/user_model";
import { ProjectModel } from "../models/project_model";
import { TaskModel } from "../models/task_model";

export const resolvers = {
  Query: {
    users: UserController.getUsers,
    user: UserController.getUser,
    projects: ProjectController.getProjects,
    project: ProjectController.getProject,
    tasks: TaskController.getTasks,
  },

  Mutation: {
    signup: AuthController.signup,
    login: AuthController.login,
    createUser: UserController.createUser,
    createProject: ProjectController.createProject,
    createTask: TaskController.createTask,
    updateTaskStatus: TaskController.updateTaskStatus,
    deleteTask: TaskController.deleteTask,
  },

  User: {
    projects: async (parent: any) => {
      return ProjectModel.findByUser(parent.id);
    },

    assignedTask: async (parent: any) => {
      return TaskModel.findByUser(parent.id);
    },
  },

  Task: {
    project: async (parent: any) => {
      if (!parent.project_id) return null;
      return ProjectModel.findById(parent.project_id);
    },

    assignedTo: async (parent: any) => {
      if (!parent.assigned_to) return null;
      return UserModel.findById(parent.assigned_to);
    },
  },
};
