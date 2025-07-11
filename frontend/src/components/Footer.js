import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Psyche Panacea</h3>
            <p className="text-gray-400">
              Pioneers of innovative and breakthrough methodologies in the Indian consultation arena.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Services', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-gray-400 hover:text-white transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {[
                'Management Trainings',
                'Employee Engagement',
                'HR Consulting',
                'Outbound Trainings',
                'Employee Assistance',
                'Career Counseling'
              ].map((service) => (
                <li key={service} className="text-gray-400">{service}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <address className="text-gray-400 not-italic">
              <p className="mb-2">Address : Psyche Panacea, 308/2, Near Country inn Hotel, Sector 12 A, Gurgaon</p>
              <p className="mb-2">Contact no. : 09810323292 , 09810319292</p>
              <p className="mb-2">Email id : hr@psypanconsulting.com</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Psyche Panacea. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;