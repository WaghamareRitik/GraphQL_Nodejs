import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_TASKS } from "../../graphql/queries";
import KanbanBoard from "../../components/task/KanbanBoard";
import CreateTask from "./CreateTask";

export default function Tasks() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, loading, error } = useQuery(GET_TASKS);

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.error(error);
    return <p>Error loading tasks</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Create Task
        </button>
      </div>

      <CreateTask isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <KanbanBoard tasks={data?.tasks || []} />
    </div>
  );
}
