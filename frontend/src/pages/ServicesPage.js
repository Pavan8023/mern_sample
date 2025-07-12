import React from 'react';
import Navbar from '../components/Navbar';


const ServicesPage = ({ onAuthOpen }) => {
  const services = [
    {
      title: "Result-Oriented Trainings",
      description: "Our trainings are designed to deliver measurable results and improve performance.",
    },
    {
      title: "HR Consulting",
      description: "Expert HR solutions to transform your organization and workforce.",
    },
    {
      title: "Outbound Trainings",
      description: "Experiential learning in outdoor settings to build teamwork and leadership.",
    },
    {
      title: "Employee Engagement",
      description: "Strategies to boost employee morale, productivity, and retention.",
    },
    {
      title: "Employee Assistance",
      description: "Support programs for employee well-being and work-life balance.",
    },
    {
      title: "Career Counseling",
      description: "Guidance for employees to navigate their career paths effectively.",
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar onAuthOpen={onAuthOpen} />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Our Services</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Comprehensive solutions to enhance your organization's performance
          </p>
        </div>
      </div>
      
      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition duration-300">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <button className="text-blue-800 font-medium hover:underline">
                    Read More 😊
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* What We Do Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Do</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions for your organizational development
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Training & Employee Engagement Services</h3>
            <p className="text-gray-700 mb-6">
              At Psyche Panacea you will discover apostles of innovative and breakthrough methodologies in Indian consultation arena. Thinking out of the box is our forte, tailor made solutions is our strong suit and outmatching customer expectation is sacrosanct.
            </p>
            <p className="text-gray-700">
              In last decade Psyche Panacea has established itself as preferred training partner and trusted destination for management solutions. Clients have always known us as pioneers of training trends. With our ability to foresee challenges to come, our clients always find us ready to cater when the need arrives.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;