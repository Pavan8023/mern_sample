import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const About = () => {
  const team = [
    { id: 1, name: 'Dr. Ananya Sharma', role: 'Founder & CEO' },
    { id: 2, name: 'Rahul Verma', role: 'Head of Training' },
    { id: 3, name: 'Priya Patel', role: 'Corporate Relations' },
    { id: 4, name: 'Vikram Mehta', role: 'Program Director' }
  ];

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 text-center bg-gradient-to-r from-blue-700 to-teal-600 text-white"
      >
        <motion.h1 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          About Psyche Panacea
        </motion.h1>
        <p className="text-xl max-w-3xl mx-auto">
          Transforming organizations through psychological insights since 2001
        </p>
      </motion.div>

      {/* About Content */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Our Story</h2>
          <p className="text-gray-700 mb-4 text-lg leading-relaxed">
            Founded in 2001, Psyche Panacea has been at the forefront of corporate training and psychological development for over two decades. We started with a simple mission: to bridge the gap between psychological insights and corporate performance.
          </p>
          <p className="text-gray-700 mb-4 text-lg leading-relaxed">
            Today, we've served over 350 clients across diverse industries, helping them unlock their true potential through evidence-based training programs. Our unique approach combines cutting-edge psychological research with practical business applications.
          </p>
          <div className="flex items-center mt-8">
            <div className="text-5xl font-bold text-blue-800 mr-4">350+</div>
            <div className="text-gray-700">Clients served since our inception</div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-md p-6 text-center border-t-4 border-blue-600"
              >
                <div className="bg-gray-200 border-2 border-dashed rounded-full w-32 h-32 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                <p className="text-blue-600 mt-2">{member.role}</p>
                <div className="flex justify-center space-x-3 mt-4">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="bg-gray-200 border-2 border-dashed rounded-full w-8 h-8" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Transform Your Organization?</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-800 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg"
          >
            Contact Us Today
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default About;