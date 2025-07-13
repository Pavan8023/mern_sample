// src/pages/admin/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (credentials.username === 'admin123' && credentials.password === 'admin@123') {
      localStorage.setItem('adminToken', 'authenticated');
      navigate('/admin'); // Redirect to admin dashboard
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter password"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;