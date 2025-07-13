// src/pages/admin/AdminNavbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNavbar = ({ isOpen, toggleSidebar, onLogout }) => {
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: '📊' },
    { name: 'Home Page', path: '/admin/edit/home', icon: '🏠' },
    { name: 'Services', path: '/admin/edit/services', icon: '🛠️' },
    { name: 'Programs', path: '/admin/edit/programs', icon: '📚' },
    { name: 'Events', path: '/admin/edit/events', icon: '🎪' },
    { name: 'Gallery', path: '/admin/edit/gallery', icon: '🖼️' },
    { name: 'About', path: '/admin/edit/about', icon: 'ℹ️' },
    { name: 'Contact', path: '/admin/edit/contact', icon: '📞' },
    { name: 'Users', path: '/admin/users', icon: '👥' },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 bg-gray-800 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        {isOpen && <h1 className="text-xl font-bold">Admin Panel</h1>}
        <button onClick={toggleSidebar} className="text-white">
          {isOpen ? '«' : '»'}
        </button>
      </div>
      
      <nav className="mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) => 
              `flex items-center p-3 hover:bg-gray-700 transition-colors ${
                isActive ? 'bg-gray-700 border-l-4 border-blue-500' : ''
              }`
            }
          >
            <span className="text-xl mr-3">{item.icon}</span>
            {isOpen && <span>{item.name}</span>}
          </NavLink>
        ))}
        
        <button
          onClick={onLogout}
          className="w-full flex items-center p-3 hover:bg-gray-700 transition-colors mt-4"
        >
          <span className="text-xl mr-3">🚪</span>
          {isOpen && <span>Logout</span>}
        </button>
      </nav>
    </div>
  );
};

export default AdminNavbar;