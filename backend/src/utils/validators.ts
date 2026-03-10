import { TaskStatus } from "./constants";

export function validateStatus(status: string) {
  if (!Object.values(TaskStatus).includes(status as TaskStatus)) {
    throw new Error("Invalid Task Status");
  }
}
