import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Users', value: 256, icon: '👥', link: '/admin/users' },
    { title: 'Recent Edits', value: 12, icon: '✏️', link: '/admin/edit' },
    { title: 'Active Pages', value: 8, icon: '📄', link: '/admin/edit' },
    { title: 'Pending Tasks', value: 3, icon: '📋', link: '/admin' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Link 
            to={stat.link} 
            key={index}
            className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <span className="text-4xl">{stat.icon}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Link 
            to="/admin/edit/home" 
            className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg hover:bg-blue-200"
          >
            Edit Home Page
          </Link>
          <Link 
            to="/admin/users" 
            className="bg-green-100 text-green-800 px-4 py-2 rounded-lg hover:bg-green-200"
          >
            Manage Users
          </Link>
          <Link 
            to="/admin/edit/services" 
            className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg hover:bg-purple-200"
          >
            Update Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;