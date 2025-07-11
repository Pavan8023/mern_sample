import React from 'react';
import SignupForm from '../components/SignupForm';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to SportsHub
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Join our community of sports enthusiasts
        </p>
        <div className="max-w-md mx-auto">
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default Home;