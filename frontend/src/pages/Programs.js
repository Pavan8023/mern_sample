import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const Programs = ({ onAuthOpen }) => {
  const programs = [
    {
      id: 1,
      title: 'Leadership Excellence',
      description: 'Transformational leadership program for senior executives',
      duration: '6 Weeks'
    },
    {
      id: 2,
      title: 'Team Dynamics',
      description: 'Building high-performance teams through effective collaboration',
      duration: '4 Weeks'
    },
    {
      id: 3,
      title: 'Strategic Thinking',
      description: 'Developing visionary thinking for organizational growth',
      duration: '8 Weeks'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onAuthOpen={onAuthOpen} />

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 text-center bg-blue-800 text-white"
      >
        <motion.h1 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Flagship Programs
        </motion.h1>
        <p className="text-xl max-w-3xl mx-auto">
          Served 350+ Clients Since 2001
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onAuthOpen && onAuthOpen('signup')} // ✅ Triggers auth modal
          className="mt-8 bg-white text-blue-800 px-6 py-3 rounded-full font-semibold text-lg"
        >
          Call Us → Get Started
        </motion.button>
      </motion.div>

      {/* Programs Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16 flex-grow">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="bg-white rounded-xl p-6 shadow-lg border border-blue-100"
            >
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
              <h3 className="text-xl font-bold text-blue-800 mb-2">{program.title}</h3>
              <p className="text-gray-600 mb-4">{program.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {program.duration}
                </span>
                <button className="text-blue-700 font-medium hover:text-blue-900 transition">
                  Learn More →
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Programs;
