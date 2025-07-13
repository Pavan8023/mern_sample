import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Experience from '../components/Experience';
import ContactForm from '../components/ContactForm';

const Home = ({ onAuthOpen }) => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar onAuthOpen={onAuthOpen} />
      
      <Hero onGetStarted={() => onAuthOpen('signup')} />
      
      <About />
      <Experience />
      <Services />
      
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">We Provide High-Quality Training & HR Consulting Services</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-800 rounded-full p-3 mr-4">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Hotline</h3>
                    <p className="text-gray-600">09810319292</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-800 rounded-full p-3 mr-4">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Send Us Email</h3>
                    <p className="text-gray-600">hr@programconsulting.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Request a Call Back</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;