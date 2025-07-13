// src/pages/admin/UsersManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersManagement = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const apiUrl = process.env.REACT_APP_API_URL || 'https://mern-sample-uw4k.onrender.com';
                const response = await axios.get(`${apiUrl}/api/users`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('adminToken')}`
                    }
                });
                
                setUsers(response.data);
                setFilteredUsers(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Failed to load users. Please try again.');
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredUsers(users);
            return;
        }
        
        const lowerCaseSearch = searchTerm.toLowerCase();
        const results = users.filter(user => 
            (user.name && user.name.toLowerCase().includes(lowerCaseSearch)) ||
            (user.email && user.email.toLowerCase().includes(lowerCaseSearch)) ||
            (user.username && user.username.toLowerCase().includes(lowerCaseSearch))
        );
        
        setFilteredUsers(results);
    }, [searchTerm, users]);

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const apiUrl = process.env.REACT_APP_API_URL || 'https://mern-sample-uw4k.onrender.com';
                await axios.delete(`${apiUrl}/api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('adminToken')}`
                    }
                });
                
                setUsers(prev => prev.filter(user => user._id !== userId));
            } catch (error) {
                console.error('Error deleting user:', error);
                setError('Failed to delete user. Please try again.');
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg">
                {error}
                <button 
                    onClick={() => window.location.reload()}
                    className="ml-4 px-3 py-1 bg-red-600 text-white rounded"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Users Management</h2>
            
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search users by name, email, or username..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            <div className="overflow-x-auto">
                {filteredUsers.length > 0 ? (
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-3 px-4 text-left border-b">Name</th>
                                <th className="py-3 px-4 text-left border-b">Username</th>
                                <th className="py-3 px-4 text-left border-b">Email</th>
                                <th className="py-3 px-4 text-left border-b">Joined</th>
                                <th className="py-3 px-4 text-left border-b">Role</th>
                                <th className="py-3 px-4 text-left border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-4">{user.name || 'N/A'}</td>
                                    <td className="py-3 px-4">{user.username || 'N/A'}</td>
                                    <td className="py-3 px-4">{user.email}</td>
                                    <td className="py-3 px-4">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                            user.role === 'admin' 
                                                ? 'bg-blue-100 text-blue-800' 
                                                : 'bg-green-100 text-green-800'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <button
                                            onClick={() => handleDeleteUser(user._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        {searchTerm ? 'No matching users found' : 'No users available'}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UsersManagement;