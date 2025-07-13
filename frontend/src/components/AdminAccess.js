import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAccess = () => {
  const [showForm, setShowForm] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleKeySequence = (e) => {
    // Activate admin panel with Ctrl+Alt+Shift+A
    if (e.ctrlKey && e.altKey && e.shiftKey && e.key === 'A') {
      setShowForm(true);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeySequence);
    return () => window.removeEventListener('keydown', handleKeySequence);
  }, []);

  const handleLogin = () => {
    if (credentials.username === 'admin123' && credentials.password === 'admin@123') {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid admin credentials');
    }
  };

  if (!showForm) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-[1000]">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({...credentials, username: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          className="w-full p-2 border rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Access Admin Panel
        </button>
      </div>
    </div>
  );
};

export default AdminAccess;