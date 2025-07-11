import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ onAuthOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Flagship Programs', path: '/programs' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-800">
              Psyche Panacea
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                className="text-gray-700 hover:text-blue-800 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            
            {isLoggedIn ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:text-blue-800 transition-colors"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <button 
                onClick={() => onAuthOpen('signup')}
                className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Get Started
              </button>
            )}
          </div>
          
          {/* ... mobile menu code ... */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;