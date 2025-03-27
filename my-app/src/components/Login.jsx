import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", form);
      localStorage.setItem("role", response.data.role);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h2>
        <input type="text" placeholder="Username" className="w-full p-3 mb-3 border rounded-lg focus:ring focus:ring-blue-300" onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <input type="password" placeholder="Password" className="w-full p-3 mb-4 border rounded-lg focus:ring focus:ring-blue-300" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">Login</button>
        <p className="mt-4 text-center text-sm">Don't have an account? <a href="/" className="text-blue-600">Register</a></p>
      </form>
    </div>
  );
}
