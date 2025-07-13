// src/pages/admin/AdminLayout.js
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100 mt-16">
      <AdminNavbar 
        isOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onLogout={handleLogout}
      />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} flex-1 flex flex-col`}>
        <div className="flex-1 overflow-auto p-6">
          {/* Add Outlet to render child routes */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;