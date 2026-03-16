import { TaskService } from "../services/task_service";
import { authMiddleware } from "../middleware/auth_middleware";

export const TaskController = {
  getTasks(_: any, args: any) {
    return TaskService.getTasks(
      args.limit,
      args.offset,
      args.status,
      args.projectId,
    );
  },

  createTask(_: any, args: any, context: any) {
    const user = authMiddleware(context);

    return TaskService.createTask(
      args.title,
      args.description,
      args.projectId,
      args.assignedTo || user.userId,
    );
  },

  updateTaskStatus(_: any, args: any, context: any) {
    authMiddleware(context);

    return TaskService.updateTaskStatus(args.taskId, args.status);
  },

  deleteTask(_: any, { taskId }: any, context: any) {
    authMiddleware(context);

    return TaskService.deleteTask(taskId);
  },
};
