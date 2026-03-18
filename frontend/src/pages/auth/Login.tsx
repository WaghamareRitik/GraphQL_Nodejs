import { useAuth0 } from "@auth0/auth0-react";

export default function Login() {
  const { loginWithRedirect, isLoading } = useAuth0();

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-lg w-[380px] text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Welcome Back 👋
        </h2>

        <button
          onClick={() => loginWithRedirect()}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Continue with Auth0
        </button>
      </div>
    </div>
  );
}
