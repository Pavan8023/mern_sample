import React from 'react';
import { FaUsers, FaCalendarAlt, FaBuilding, FaChalkboardTeacher } from 'react-icons/fa';

const Experience = () => {
  const stats = [
    { icon: <FaUsers size={36} />, value: '3Lakh+', label: 'Participants Trained' },
    { icon: <FaCalendarAlt size={36} />, value: '22+', label: 'Years' },
    { icon: <FaBuilding size={36} />, value: '350+', label: 'Company' },
    { icon: <FaChalkboardTeacher size={36} />, value: '250+', label: 'Training Associates' },
  ];

  return (
    <section className="py-16 bg-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Experience</h2>
          <p className="text-xl max-w-3xl mx-auto">
            We are known as the pioneers of training trends
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="mb-4 flex justify-between">
            <span>Progress in last decade</span>
            <span>— —</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
            <div 
              className="bg-yellow-500 h-4 rounded-full" 
              style={{ width: '85%' }}
            ></div>
          </div>
          
          <p className="text-center">
            In last decade Psyche Panacea has established itself as preferred corporate training partner and trusted destination for management solutions. With our ability to foresee challenges to come, our clients always find us ready to cater when the need arrives.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Experience;