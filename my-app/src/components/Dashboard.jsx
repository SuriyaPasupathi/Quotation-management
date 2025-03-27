import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/dashboard/")
      .then((res) => setMessage(res.data.message))
      .catch(() => setMessage("Unauthorized"));
  }, []);

  const handleLogout = () => {
    axios.post("http://127.0.0.1:8000/logout/")
      .then(() => {
        localStorage.removeItem("role");
        navigate("/login");
      });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-200">
      <h2 className="text-3xl font-bold text-gray-800">{message}</h2>
      <button onClick={handleLogout} className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg">Logout</button>
    </div>
  );
}
