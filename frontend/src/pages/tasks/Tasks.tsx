import { useQuery } from "@apollo/client/react";
import { GET_TASKS } from "../../graphql/queries";
import KanbanBoard from "../../components/task/KanbanBoard";
import CreateTask from "./CreateTask";

export default function Tasks() {
  const { data, loading } = useQuery(GET_TASKS);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <CreateTask />

      <KanbanBoard tasks={data.tasks} />
    </div>
  );
}
