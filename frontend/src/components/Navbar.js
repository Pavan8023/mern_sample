import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ onAuthOpen }) => {
  // State variables remain unchanged
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  // Navigation items already include the required pages
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Flagship Programs', path: '/programs' }, // Points to Programs.js
    { name: 'Events', path: '/events' }, // Points to Events.js
    { name: 'Gallery', path: '/gallery' }, // Points to Gallery.js
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Rest of the code remains unchanged
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
          
          {/* Desktop Menu - Already contains the required links */}
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
          
          {/* Mobile menu button would go here */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-800"
            >
              {/* Hamburger icon */}
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link 
                  key={item.name}
                  to={item.path}
                  className="text-gray-700 hover:text-blue-800 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {isLoggedIn ? (
                <>
                  <Link 
                    to="/dashboard"
                    className="text-gray-700 hover:text-blue-800 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-800"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => {
                    onAuthOpen('signup');
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-800"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;