import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');

        if (!refreshToken) {
            console.error("No refresh token found.");
            return;
        }

        const response = await axios.post('http://127.0.0.1:8000/logout/', 
            { refresh_token: refreshToken },
            { headers: { 'Authorization': `Bearer ${accessToken}` } }
        );

        if (response.status === 200) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            navigate('/');
        } else {
            console.error('Logout failed:', response.data);
        }
    } catch (error) {
        console.error('Error during logout:', error.response?.data || error.message);
    }
};



  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-10 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Dashboard</h1>
        <p className="text-lg text-center text-gray-600 mb-6">
          Welcome to the Dashboard! You have successfully logged in.
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
