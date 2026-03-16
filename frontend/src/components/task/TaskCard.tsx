interface Task {
  id: string;
  title: string;
  project?: { name: string };
  assignedTo?: { name: string };
}

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
      <h3 className="font-semibold text-gray-800">{task.title}</h3>

      <p className="text-sm text-gray-500 mt-1">
        Project: {task.project?.name || "Unknown"}
      </p>

      <p className="text-sm text-gray-500">
        Assignee: {task.assignedTo?.name || "Unassigned"}
      </p>
    </div>
  );
}
