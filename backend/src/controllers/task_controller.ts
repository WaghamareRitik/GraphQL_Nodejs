import { TaskService } from "../services/task_service";

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
    const user = context.user;

    if (!user) throw new Error("Unauthorized");

    return TaskService.createTask(
      args.title,
      args.description,
      args.projectId,
      args.assignedTo || user.id,
    );
  },

  updateTaskStatus(_: any, args: any) {
    return TaskService.updateTaskStatus(args.taskId, args.status);
  },

  deleteTask(_: any, { taskId }: any) {
    return TaskService.deleteTask(taskId);
  },
};
