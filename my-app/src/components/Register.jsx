// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const [form, setForm] = useState({ username: "", email: "", password: "", role: "user" });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://127.0.0.1:8000/register/", form);
//       alert("Registration successful");
//       navigate("/login");
//     } catch (error) {
//       alert(error.response.data.error);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-200">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Register</h2>
//         <input type="text" placeholder="Username" className="w-full p-3 mb-3 border rounded-lg focus:ring focus:ring-blue-300" onChange={(e) => setForm({ ...form, username: e.target.value })} />
//         <input type="email" placeholder="Email" className="w-full p-3 mb-3 border rounded-lg focus:ring focus:ring-blue-300" onChange={(e) => setForm({ ...form, email: e.target.value })} />
//         <input type="password" placeholder="Password" className="w-full p-3 mb-4 border rounded-lg focus:ring focus:ring-blue-300" onChange={(e) => setForm({ ...form, password: e.target.value })} />
//         <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">Register</button>
//         <p className="mt-4 text-center text-sm">Already have an account? <a href="/login" className="text-blue-600">Login</a></p>
//       </form>
//     </div>
//   );
// }
