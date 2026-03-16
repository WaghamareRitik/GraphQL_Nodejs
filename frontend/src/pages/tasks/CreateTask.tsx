import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { CREATE_TASK } from "../../graphql/mutations";
import { GET_TASKS, GET_PROJECTS, GET_USERS } from "../../graphql/queries";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const { data: projects } = useQuery(GET_PROJECTS);
  const { data: users } = useQuery(GET_USERS);

  const [createTask] = useMutation(CREATE_TASK, {
    refetchQueries: [GET_TASKS],
  });

  const handleSubmit = async (e: any) => {
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
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6">
      <h2 className="font-semibold mb-4">Create Task</h2>

      <input
        className="border p-2 w-full mb-3 rounded"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-3 rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Project Dropdown */}

      <select
        className="border p-2 w-full mb-3 rounded"
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
      >
        <option>Select Project</option>

        {projects?.projects.map((p: any) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      {/* User Dropdown */}

      <select
        className="border p-2 w-full mb-4 rounded"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      >
        <option>Assign User</option>

        {users?.users.map((u: any) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>

      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Create Task
      </button>
    </form>
  );
}
