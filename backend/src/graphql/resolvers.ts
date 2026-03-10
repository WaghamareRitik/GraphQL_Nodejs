import { UserController } from "../controllers/user_controller";
import { ProjectController } from "../controllers/project_controller";
import { TaskController } from "../controllers/task_controller";

export const resolvers = {
  Query: {
    users: UserController.getUsers,
    user: UserController.getUser,

    projects: ProjectController.getProjects,
    project: ProjectController.getProject,

    tasks: TaskController.getTasks,
  },

  Mutation: {
    createUser: UserController.createUser,

    createProject: ProjectController.createProject,

    createTask: TaskController.createTask,

    updateTaskStatus: TaskController.updateTaskStatus,

    deleteTask: TaskController.deleteTask,
  },
};
