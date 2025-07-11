import React from 'react';
import { FaUserGraduate, FaBuilding } from 'react-icons/fa';

const About = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            About Psyche Panacea
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Clients have always known us as pioneers of learning trends
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gray-700 mb-6">
              With the ability to anticipate challenges, Psyche Panacea is always ready when our clients need us.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-blue-800 rounded-full p-3 mr-4">
                  <FaUserGraduate className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Helping Employees Grow
                  </h3>
                  <p className="text-gray-600">
                    We have trained over 3,00,000 employees.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-800 rounded-full p-3 mr-4">
                  <FaBuilding className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Leading Training Organization
                  </h3>
                  <p className="text-gray-600">
                    More than 350+ organizations in past 22 years
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 md:h-96" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;