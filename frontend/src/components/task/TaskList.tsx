import { useMutation } from "@apollo/client/react";
import { DELETE_TASK, UPDATE_TASK } from "../../graphql/mutations";
import { GET_TASKS } from "../../graphql/queries";

export default function TaskList({ tasks }: any) {
  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [GET_TASKS],
  });

  const [updateTask] = useMutation(UPDATE_TASK, {
    refetchQueries: [GET_TASKS],
  });

  return (
    <div className="space-y-4">
      {tasks.map((task: any) => (
        <div
          key={task.id}
          className="bg-white shadow p-4 rounded flex justify-between items-center"
        >
          <div>
            <h4 className="font-semibold">{task.title}</h4>

            <p className="text-gray-500">{task.status}</p>
          </div>

          <div className="flex gap-2">
            <button
              className="bg-yellow-500 text-white px-3 py-1 rounded"
              onClick={() =>
                updateTask({
                  variables: {
                    taskId: task.id,
                    status: "DONE",
                  },
                })
              }
            >
              Done
            </button>

            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() =>
                deleteTask({
                  variables: { taskId: task.id },
                })
              }
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
