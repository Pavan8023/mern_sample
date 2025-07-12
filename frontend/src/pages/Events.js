import React from 'react';
import { motion } from 'framer-motion';

const Events = () => {
  const events = [
    {
      id: 1,
      title: 'Annual Leadership Summit',
      date: '15 July 2025',
      location: 'New Delhi'
    },
    {
      id: 2,
      title: 'Corporate Wellness Workshop',
      date: '28 August 2025',
      location: 'Mumbai'
    },
    {
      id: 3,
      title: 'Team Building Conference',
      date: '12 September 2025',
      location: 'Bangalore'
    }
  ];

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 text-center bg-gradient-to-r from-blue-700 to-blue-900 text-white"
      >
        <motion.h1 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Upcoming Events
        </motion.h1>
        <p className="text-xl max-w-3xl mx-auto">
          Join our transformative corporate training experiences
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 bg-white text-blue-800 px-6 py-3 rounded-full font-semibold text-lg"
        >
          Register Now →
        </motion.button>
      </motion.div>

      {/* Events Timeline */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3, duration: 0.6 }}
              className="flex flex-col md:flex-row items-center"
            >
              <div className="mb-4 md:mb-0 md:w-1/3 text-center">
                <div className="bg-white rounded-xl shadow-md p-6 inline-block">
                  <div className="text-3xl font-bold text-blue-800">
                    {event.date.split(' ')[0]}
                  </div>
                  <div className="text-lg font-medium">
                    {event.date.split(' ').slice(1).join(' ')}
                  </div>
                </div>
              </div>
              <div className="md:w-2/3 bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {event.location}
                </div>
                <button className="text-blue-700 font-medium hover:text-blue-900 transition">
                  View Details →
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Events;