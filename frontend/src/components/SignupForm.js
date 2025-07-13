import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupForm = ({ switchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (errors.submit) {
      setErrors(prev => ({ ...prev, submit: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setIsLoading(true);
      setErrors({});
      
      const apiUrl = process.env.REACT_APP_API_URL || 'https://mern-sample-uw4k.onrender.com';
      
      const response = await axios.post(
        `${apiUrl}/api/auth/signup`,
        {
          username: formData.username,
          email: formData.email,
          password: formData.password
        },
        {
          timeout: 10000 // 10-second timeout
        }
      );

      // Save token and user to localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      setSuccessMessage('Account created successfully! Redirecting to dashboard...');
      
      // Redirect to dashboard after 1.5 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
      
    } catch (error) {
      let errorMessage = 'Signup failed. Please try again.';
      let fieldErrors = {};
      
      if (error.response) {
        // Handle backend validation errors
        if (error.response.status === 400) {
          errorMessage = error.response.data.message || 'Validation error';
          
          // Map backend errors to fields
          if (error.response.data.errors) {
            error.response.data.errors.forEach(err => {
              fieldErrors[err.path] = err.msg;
            });
          }
        } 
        // Handle conflict errors
        else if (error.response.status === 409) {
          if (error.response.data.message.includes('email')) {
            fieldErrors.email = 'Email already exists';
          } else if (error.response.data.message.includes('username')) {
            fieldErrors.username = 'Username already taken';
          }
        }
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Please try again.';
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your connection.';
      } else {
        errorMessage = error.message || 'Request setup error';
      }
      
      setErrors({
        ...fieldErrors,
        submit: fieldErrors.email || fieldErrors.username ? '' : errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
      
      {successMessage ? (
        <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
          {successMessage}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.submit && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg">
              {errors.submit}
            </div>
          )}
          
          <div>
            <label className="block text-gray-700 mb-2">Username *</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg ${
                errors.username ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
              }`}
              placeholder="Choose a username"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg ${
                errors.email ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
              }`}
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg ${
                errors.password ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
              }`}
              placeholder="At least 6 characters"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
              }`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                Creating Account...
              </span>
            ) : (
              'Sign Up'
            )}
          </button>
          
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button 
                type="button"
                className="text-blue-600 hover:underline font-medium"
                onClick={() => {
                  setErrors({});
                  switchToLogin();
                }}
              >
                Log in
              </button>
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default SignupForm;