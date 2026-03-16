import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_PROJECT } from "../../graphql/mutations";
import { GET_PROJECTS } from "../../graphql/queries";

export default function CreateProjectModal({ close }: any) {
  const [name, setName] = useState("");

  const [createProject] = useMutation(CREATE_PROJECT, {
    refetchQueries: [GET_PROJECTS],
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await createProject({
      variables: { name },
    });

    close();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[400px]">
        <h2 className="text-lg font-semibold mb-4">Create Project</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Project name"
            className="w-full border p-2 rounded mb-4"
            onChange={(e) => setName(e.target.value)}
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={close}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
