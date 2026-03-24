import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { CREATE_TASK } from "../../graphql/mutations";
import { GET_TASKS, GET_PROJECTS, GET_USERS } from "../../graphql/queries";

interface CreateTaskProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateTask({ isOpen, onClose }: CreateTaskProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const { data: projects } = useQuery(GET_PROJECTS);
  const { data: users } = useQuery(GET_USERS);

  const [createTask] = useMutation(CREATE_TASK, {
    update(cache, { data }) {
      const newTask = data?.createTask;
      if (!newTask) return;

      const existing: any = cache.readQuery({ query: GET_TASKS });

      if (existing) {
        cache.writeQuery({
          query: GET_TASKS,
          data: {
            tasks: [newTask, ...existing.tasks],
          },
        });
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createTask({
      variables: {
        title,
        description,
        projectId,
        assignedTo,
      },
    });

    setTitle("");
    setDescription("");
    setProjectId("");
    setAssignedTo("");

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[400px] p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Create Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            className="w-full border p-2 rounded"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="w-full border p-2 rounded"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            required
          >
            <option value="">Select Project</option>
            {projects?.projects?.map((p: any) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <select
            className="w-full border p-2 rounded"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            required
          >
            <option value="">Assign User</option>
            {users?.users?.map((u: any) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border p-2 rounded"
            >
              Cancel
            </button>
            <button className="flex-1 bg-blue-600 text-white p-2 rounded">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
