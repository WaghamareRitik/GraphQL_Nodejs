import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_PROJECT } from "../../graphql/mutations";
import { GET_PROJECTS } from "../../graphql/queries";

export default function CreateProject() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [createProject] = useMutation(CREATE_PROJECT, {
    refetchQueries: [GET_PROJECTS],
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await createProject({
      variables: {
        name,
        description,
      },
    });

    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mb-6">
      <h3 className="font-semibold mb-3">Create Project</h3>

      <input
        className="border p-2 mb-2 w-full"
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-2 mb-2 w-full"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Create
      </button>
    </form>
  );
}
