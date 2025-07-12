import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ isOpen, onClose, mode, setMode }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (mode === 'signup') {
      if (!formData.name.trim()) {
        newErrors.name = 'Full name is required';
      } else if (formData.name.length < 3) {
        newErrors.name = 'Name must be at least 3 characters';
      }
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (mode === 'signup' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'https://mern-sample-uw4k.onrender.com';
      
      if (mode === 'signup') {
        const response = await axios.post(`${apiUrl}/api/auth/signup`, {
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        
        // Store user data and token in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        
        setSuccessMessage('Account created successfully! Redirecting to dashboard...');
        
        // Close modal and redirect to dashboard after delay
        setTimeout(() => {
          onClose();
          navigate('/dashboard');
        }, 1500);
      } else {
        const response = await axios.post(`${apiUrl}/api/auth/login`, {
          email: formData.email,
          password: formData.password
        });
        
        // Store user data and token in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        
        setSuccessMessage('Login successful! Redirecting to dashboard...');
        
        // Close modal and redirect to dashboard after delay
        setTimeout(() => {
          onClose();
          navigate('/dashboard');
        }, 1500);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      
      let errorMessage = mode === 'signup' ? 'Signup failed' : 'Login failed';
      
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = 'Invalid credentials';
        } else if (error.response.status === 409) {
          errorMessage = 'Email already exists';
        } else {
          errorMessage = error.response.data.message || errorMessage;
        }
      } else if (error.request) {
        errorMessage = 'No response from server. Please try again later.';
      }
      
      setErrors({ submit: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {mode === 'signup' ? 'Create Account' : 'Login to Your Account'}
          </h2>
          
          {successMessage && (
            <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4">
              {successMessage}
            </div>
          )}
          
          {errors.submit && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
              {errors.submit}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md ${
                    errors.name ? 'border-red-500' : 'border-gray-300 focus:border-blue-800'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md ${
                    errors.email ? 'border-red-500' : 'border-gray-300 focus:border-blue-800'
                  }`}
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md ${
                    errors.password ? 'border-red-500' : 'border-gray-300 focus:border-blue-800'
                  }`}
                placeholder="At least 6 characters"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            
            {mode === 'signup' && (
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300 focus:border-blue-800'
                  }`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  {mode === 'signup' ? 'Creating Account...' : 'Logging in...'}
                </span>
              ) : (
                mode === 'signup' ? 'Create Account' : 'Login'
              )}
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <button
              onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
              className="text-blue-800 hover:underline"
            >
              {mode === 'signup' 
                ? 'Already have an account? Login' 
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;