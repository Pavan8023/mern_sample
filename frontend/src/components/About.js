import React from 'react';

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
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
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
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
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
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 md:h-96 overflow-hidden">
              <img
                src="https://www.psypanconsulting.com/wp-content/uploads/2021/11/blog4.jpg"
                alt="Service"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;