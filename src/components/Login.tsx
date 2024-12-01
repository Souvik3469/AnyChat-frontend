import { useState } from "react";
import axios from "axios";

const Login = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:1337";
  const loginUrl = `${backendUrl}/api/auth/local`;
  console.log("Login Url", backendUrl);
  const handleLogin = async () => {
    try {
      const response = await axios.post(loginUrl, {
        identifier: email,
        password,
      });
      console.log("Login response", response);

      const { jwt } = response.data;
      localStorage.setItem("auth", jwt);
      onLoginSuccess();
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            onClick={handleLogin}
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
