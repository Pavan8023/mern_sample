import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = ({ onAuthOpen }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onAuthOpen={onAuthOpen} />
      
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
          
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Welcome to Your Dashboard</h2>
            <p className="text-gray-700">
              Here you can manage your account, view your training history, and access exclusive resources.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Trainings</h3>
              <div className="space-y-4">
                {[1, 2, 3].map(item => (
                  <div key={item} className="flex items-start border-b pb-4">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4" />
                    <div>
                      <h4 className="font-medium text-gray-900">Leadership Development Program</h4>
                      <p className="text-gray-600 text-sm">July 25, 2025 | 10:00 AM</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition">
                View All Trainings
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Training History</h3>
              <div className="space-y-3">
                {[1, 2, 3].map(item => (
                  <div key={item} className="border-b pb-3">
                    <h4 className="font-medium text-gray-900">Team Building Workshop</h4>
                    <p className="text-gray-600 text-sm">Completed: June 15, 2025</p>
                    <div className="flex items-center text-sm mt-1">
                      <span className="text-yellow-500">★★★★☆</span>
                      <span className="ml-2">4.2/5</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition">
                View Full History
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <p className="text-gray-900">John Doe</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-gray-900">john@example.com</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                  <p className="text-gray-900">ABC Corporation</p>
                </div>
              </div>
              <button className="mt-6 w-full py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;