import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_USERS } from "../../graphql/queries";
import { SIGNUP } from "../../graphql/mutations";

export default function Users() {
  /* ---------------- PAGINATION ---------------- */
  const [page, setPage] = useState(1);
  const limit = 5;
  const offset = (page - 1) * limit;

  /* ---------------- SEARCH ---------------- */
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  /* ---------------- QUERY ---------------- */
  const { data, loading, error, refetch } = useQuery(GET_USERS, {
    variables: { limit, offset },
  });

  const [createUser] = useMutation(SIGNUP);

  let users = data?.users || [];

  /* ---------------- FILTER (FRONTEND SEARCH) ---------------- */
  if (debouncedSearch) {
    users = users.filter(
      (u: any) =>
        u.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }

  /* ---------------- CREATE USER ---------------- */
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreate = async (e: any) => {
    e.preventDefault();

    try {
      await createUser({
        variables: { name, email, password },
      });

      setName("");
      setEmail("");
      setPassword("");

      setOpen(false);
      refetch();
    } catch (err) {
      console.error("User creation failed", err);
    }
  };

  if (loading) return <p className="p-6">Loading users...</p>;
  if (error) return <p className="p-6 text-red-500">Error loading users</p>;

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Create User
        </button>
      </div>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search users..."
        className="mb-4 w-full border p-2 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm text-gray-600">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Projects</th>
              <th className="p-4">Tasks</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user: any) => (
              <tr key={user.id} className="border-t">
                <td className="p-4 font-medium">{user.name}</td>
                <td className="p-4 text-gray-600">{user.email}</td>
                <td className="p-4">{user.projects?.length || 0}</td>
                <td className="p-4">{user.assignedTask?.length || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📄 PAGINATION */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm">Page {page}</span>

        <button
          disabled={users.length < limit}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* CREATE USER MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-[400px] p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Create User</h2>

            <form onSubmit={handleCreate} className="space-y-4">
              <input
                className="w-full border p-2 rounded"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className="w-full border p-2 rounded"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                className="w-full border p-2 rounded"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
