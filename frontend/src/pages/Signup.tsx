import { useMutation } from "@apollo/client";
import { SIGNUP } from "../graphql/mutations";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const [signup] = useMutation(SIGNUP);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { data } = await signup({
      variables: { name, email, password },
    });

    login(data.signup.token);

    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>

      <input placeholder="name" onChange={(e) => setName(e.target.value)} />

      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />

      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Signup</button>
    </form>
  );
}
