import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useMutation } from "@apollo/client/react";
import { UPDATE_TASK } from "../../graphql/mutations";
import { GET_TASKS } from "../../graphql/queries";

interface Task {
  id: string;
  title: string;
  status: string;
  project?: {
    id: string;
    name: string;
  };
  assignedTo?: {
    id: string;
    name: string;
  };
}

const columns = ["TODO", "IN_PROGRESS", "DONE"];

export default function KanbanBoard({ tasks }: { tasks: Task[] }) {
  const [updateTask] = useMutation(UPDATE_TASK);

  const groupedTasks: any = columns.reduce((acc: any, column) => {
    acc[column] = tasks.filter((task) => task.status === column);
    return acc;
  }, {});

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    if (result.source.droppableId === newStatus) return;

    updateTask({
      variables: {
        taskId,
        status: newStatus,
      },

      optimisticResponse: {
        updateTaskStatus: {
          id: taskId,
          status: newStatus,
          __typename: "Task",
        },
      },

      update: (cache, { data }) => {
        const updatedTask = data?.updateTaskStatus;
        if (!updatedTask) return;

        const existing: any = cache.readQuery({
          query: GET_TASKS,
        });

        if (!existing) return;

        const newTasks = existing.tasks.map((task: Task) =>
          task.id === taskId ? { ...task, status: updatedTask.status } : task,
        );

        cache.writeQuery({
          query: GET_TASKS,
          data: {
            tasks: newTasks,
          },
        });
      },
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-6">
        {columns.map((column) => (
          <Droppable droppableId={column} key={column}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-200 p-4 rounded-xl min-h-[400px]"
              >
                <h3 className="font-bold text-lg mb-4">
                  {column.replace("_", " ")}
                </h3>

                {groupedTasks[column]?.map((task: Task, index: number) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white p-4 mb-3 rounded-lg shadow hover:shadow-md transition"
                      >
                        <h4 className="font-semibold">{task.title}</h4>

                        <p className="text-xs text-gray-500 mt-1">
                          Project: {task.project?.name || "Unknown"}
                        </p>

                        <p className="text-xs text-gray-500">
                          Assigned: {task.assignedTo?.name || "Unassigned"}
                        </p>
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
