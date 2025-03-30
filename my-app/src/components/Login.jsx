import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');
    
        try {
            const response = await fetch('http://127.0.0.1:8000/login/', {  // Ensure this URL matches your backend URL
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
    
            const data = await response.json();
    
            if (response.ok && data.access_token) {
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);
                localStorage.setItem('role', data.role);  // Save role if needed
    
                // Navigate to Dashboard
                navigate('/Dashboard');  // Just use '/dashboard' for the general dashboard page
            } else {
                setErrorMessage(data.message || 'Invalid credentials. Please try again.');
            }
        } catch (error) {
            setErrorMessage('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl border border-gray-200">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
                
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    {errorMessage && (
                        <p className="text-red-500 text-center text-sm">{errorMessage}</p>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="w-full p-3 text-white bg-blue-600 rounded-lg"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
