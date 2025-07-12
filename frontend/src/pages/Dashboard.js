import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activePrograms, setActivePrograms] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    // Get user from localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
    
    // Mock data - in a real app, this would come from an API
    setActivePrograms([
      {
        id: 1,
        title: 'Leadership Excellence',
        progress: 65,
        modules: 8,
        completed: 5,
        nextSession: 'July 18, 2025'
      },
      {
        id: 2,
        title: 'Emotional Intelligence',
        progress: 30,
        modules: 6,
        completed: 2,
        nextSession: 'July 20, 2025'
      }
    ]);
    
    setUpcomingEvents([
      {
        id: 1,
        title: 'Team Building Workshop',
        date: 'July 22, 2025',
        time: '10:00 AM - 1:00 PM',
        location: 'Online'
      },
      {
        id: 2,
        title: 'Annual Leadership Summit',
        date: 'August 5, 2025',
        time: '9:00 AM - 4:00 PM',
        location: 'New Delhi'
      }
    ]);
    
    setResources([
      {
        id: 1,
        title: 'Conflict Resolution Guide',
        type: 'PDF',
        category: 'Leadership',
        size: '2.4 MB'
      },
      {
        id: 2,
        title: 'Team Dynamics Video Series',
        type: 'Video',
        category: 'Team Building',
        size: '15 episodes'
      },
      {
        id: 3,
        title: 'Mindfulness Meditation Audio',
        type: 'Audio',
        category: 'Wellness',
        size: '45 min'
      }
    ]);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto mb-4"></div>
          <p>Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Learning Dashboard</h1>
            <p className="text-gray-600 mb-6">Track your progress and access resources</p>
          </motion.div>
          
          {/* Welcome Card */}
          <motion.div 
            className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 mb-8 text-white"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold mb-2">
              Welcome back, {user.username}!
            </h2>
            <p className="mb-4">
              You're making great progress in your leadership journey. Continue to access exclusive resources below.
            </p>
            <div className="flex items-center">
              <div className="bg-white/20 rounded-full px-4 py-1 mr-4">
                Member since: {new Date().getFullYear() - Math.floor(Math.random() * 3)}
              </div>
              <div className="bg-white/20 rounded-full px-4 py-1">
                Completed programs: {Math.floor(Math.random() * 5) + 1}
              </div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Active Programs */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Your Active Programs</h2>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  View All
                </button>
              </div>
              
              <div className="space-y-6">
                {activePrograms.map((program) => (
                  <motion.div
                    key={program.id}
                    whileHover={{ y: -5 }}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg text-gray-800">{program.title}</h3>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {program.completed}/{program.modules} modules
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <motion.div 
                          className="bg-blue-600 h-2.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${program.progress}%` }}
                          transition={{ duration: 1 }}
                        ></motion.div>
                      </div>
                      <div className="text-right text-sm text-gray-500 mt-1">
                        {program.progress}% complete
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <div>
                        <span className="text-gray-500">Next session:</span>{' '}
                        <span className="font-medium">{program.nextSession}</span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        Continue →
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Explore New Programs
              </motion.button>
            </motion.div>
            
            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  View Calendar
                </button>
              </div>
              
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    whileHover={{ y: -3 }}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start">
                      <div className="bg-blue-100 text-blue-800 rounded-lg p-3 mr-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">{event.title}</h3>
                        <div className="flex flex-wrap text-sm text-gray-600 mt-1">
                          <div className="flex items-center mr-4">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {event.date}, {event.time}
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {event.location}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-3">
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        Add to Calendar
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resources.map((resource) => (
                    <motion.div
                      key={resource.id}
                      whileHover={{ scale: 1.02 }}
                      className="border border-gray-200 rounded-lg p-4 flex items-start"
                    >
                      <div className={`mr-3 ${
                        resource.type === 'PDF' ? 'text-red-500' : 
                        resource.type === 'Video' ? 'text-blue-500' : 
                        'text-green-500'
                      }`}>
                        {resource.type === 'PDF' ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        ) : resource.type === 'Video' ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{resource.title}</h4>
                        <div className="flex justify-between text-sm text-gray-600 mt-1">
                          <span>{resource.category}</span>
                          <span>{resource.size}</span>
                        </div>
                      </div>
                      <button className="text-blue-600 ml-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Company Overview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-8"
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About Psyche Panacea</h2>
                <p className="text-gray-700 mb-4">
                  Psyche Panacea has been transforming organizations through psychological insights since 2001. 
                  We specialize in corporate training programs that enhance leadership, team dynamics, and 
                  organizational performance.
                </p>
                <p className="text-gray-700 mb-6">
                  With over 350 clients served, our evidence-based approach combines cutting-edge psychological 
                  research with practical business applications to unlock your organization's true potential.
                </p>
                <div className="flex space-x-4">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.psypanconsulting.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium"
                  >
                    Visit Our Website
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/contact"
                    className="border border-blue-600 text-blue-600 px-6 py-2.5 rounded-lg font-medium"
                  >
                    Contact Us
                  </motion.a>
                </div>
              </div>
              <div className="md:w-1/3 grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center"
                  >
                    <div className="text-2xl font-bold text-blue-700 mb-1">
                      {item === 1 ? '350+' : item === 2 ? '20+' : item === 3 ? '95%' : '2001'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {item === 1 ? 'Clients Served' : 
                       item === 2 ? 'Training Programs' : 
                       item === 3 ? 'Client Satisfaction' : 
                       'Established'}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;