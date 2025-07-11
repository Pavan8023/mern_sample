import React from 'react';

const Hero = ({ onGetStarted }) => {
  return (
    <div className="relative bg-gradient-to-r from-blue-800 to-blue-600 text-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome To <span className="text-yellow-400">Psyche Panacea</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
              Management Trainings
            </h2>
            <p className="text-lg mb-8">
              Served 350+ Clients Since 2001
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="tel:09810319292" 
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-8 rounded-lg text-center transition-colors"
              >
                Call Us 😊
              </a>
              <button 
                onClick={onGetStarted}
                className="bg-white hover:bg-gray-100 text-blue-800 font-medium py-3 px-8 rounded-lg transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 md:h-96" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;