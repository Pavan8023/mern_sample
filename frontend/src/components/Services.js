import React from 'react';

const Services = () => {
  const services = [
    { 
      title: "Result-Oriented Trainings", 
      description: "Our trainings are designed to deliver measurable results and improve performance." 
    },
    { 
      title: "HR Consulting", 
      description: "Expert HR solutions to transform your organization and workforce." 
    },
    { 
      title: "Outbound Trainings", 
      description: "Experiential learning in outdoor settings to build teamwork and leadership." 
    },
    { 
      title: "Employee Engagement", 
      description: "Strategies to boost employee morale, productivity, and retention." 
    },
    { 
      title: "Employee Assistance", 
      description: "Support programs for employee well-being and work-life balance." 
    },
    { 
      title: "Career Counseling", 
      description: "Guidance for employees to navigate their career paths effectively." 
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions to enhance your organization's performance
          </p>
        </div>
        
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
  );
};

export default Services;