import { UserController } from "../controllers/user_controller";
import { ProjectController } from "../controllers/project_controller";
import { TaskController } from "../controllers/task_controller";

import { UserModel } from "../models/user_model";
import { ProjectModel } from "../models/project_model";
import { pool } from "../config/db";

// 🔐 Auth Guard
const requireAuth = (context: any) => {
  if (!context.user) {
    throw new Error("Unauthorized");
  }
};

const requireAdmin = (context: any) => {
  if (!context.user) {
    throw new Error("Unauthorized");
  }

  if (context.user.role !== "admin") {
    throw new Error("Access denied: Admins only");
  }
};

export const resolvers = {
  Query: {
    me: (_: any, __: any, context: any) => {
      return context.user;
    },
    users: (_: any, args: any) => {
      return UserController.getUsers(_, args);
    },

    user: (_: any, args: any, context: any) => {
      requireAuth(context);
      return UserController.getUser(_, args);
    },

    projects: (_: any, args: any, context: any) => {
      requireAuth(context);
      return ProjectController.getProjects(_, args);
    },

    project: (_: any, args: any, context: any) => {
      requireAuth(context);
      return ProjectController.getProject(_, args);
    },

    tasks: (_: any, args: any, context: any) => {
      requireAuth(context);
      return TaskController.getTasks(_, args);
    },
  },

  Mutation: {
    createUser: (_: any, args: any, context: any) => {
      requireAuth(context);
      return UserController.createUser(_, args);
    },

    createProject: (_: any, args: any, context: any) => {
      requireAuth(context);
      return ProjectController.createProject(_, args, context); // ✅ FIXED
    },

    createTask: (_: any, args: any, context: any) => {
      requireAuth(context);
      return TaskController.createTask(_, args, context); // ✅ FIXED
    },

    updateTaskStatus: (_: any, args: any, context: any) => {
      requireAuth(context);
      return TaskController.updateTaskStatus(_, args);
    },

    deleteTask: (_: any, args: any, context: any) => {
      requireAuth(context);
      return TaskController.deleteTask(_, args);
    },
  },

  User: {
    projects: async (parent: any) => {
      const result = await pool.query(
        `SELECT * FROM projects WHERE created_by = $1`,
        [parent.id],
      );
      return result.rows;
    },

    assignedTask: async (parent: any) => {
      const result = await pool.query(
        `SELECT * FROM tasks WHERE assigned_to = $1`,
        [parent.id],
      );
      return result.rows;
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
