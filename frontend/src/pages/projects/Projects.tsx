import { useQuery } from "@apollo/client/react";
import { GET_PROJECTS } from "../../graphql/queries";
import { useState } from "react";
import CreateProjectModal from "./CreateProjectModal";

export default function Projects() {
  const { data, loading } = useQuery(GET_PROJECTS);
  const [open, setOpen] = useState(false);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Projects</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Project
        </button>
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.projects?.map((project: any) => (
          <div
            key={project.id}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {project.name}
            </h3>
          </div>
        ))}
      </div>

      {/* Modal */}
      {open && <CreateProjectModal close={() => setOpen(false)} />}
    </div>
  );
}
