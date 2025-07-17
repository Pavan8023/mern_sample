import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Stable array of background images
const backgroundImages = [
  'https://lh3.googleusercontent.com/p/AF1QipPdF1ULFTSxiU3RGFURn1ZCDKt8tsPdg-nNNDNy=s1360-w1360-h1020-rw',
  'https://lh3.googleusercontent.com/p/AF1QipPiWvOttoiP2Kk2Wl2g_7ezxfQr-WO5CPbYZJku=s1360-w1360-h1020-rw',
  'https://lh3.googleusercontent.com/p/AF1QipNbVxi5gDs_jmFTuPJE5tFTkk0pmcW3pCHPPTQ0=s1360-w1360-h1020-rw',
  'https://lh3.googleusercontent.com/p/AF1QipNSPrL5WgfED0z2hro403kmlUh5Gwso5q6ocbOw=s1360-w1360-h1020-rw',
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % backgroundImages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative text-white min-h-screen flex items-center overflow-hidden">
      {/* Background layers for smooth fade */}
      {backgroundImages.map((img, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${img})`,
            opacity: index === currentImage ? 1 : 0,
            transition: 'opacity 1500ms ease-in-out',
          }}
        />
      ))}

      {/* Semi-transparent overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
              Welcome To <br />
              <span
                className="text-blue-700"
                style={{ fontSize: '3.5rem', letterSpacing: '1px', fontWeight: 800 }}
              >
                Psyche Panacea
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-300">
              Management Trainings
            </h2>
            <p className="text-xl mb-8 font-light text-blue-100">
              Served 350+ Clients Since 2001
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="tel:09810319292"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-lg text-center transition-all transform hover:scale-105 shadow-lg"
              >
                Call Us
              </a>
              <Link
                to="/about"
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Know More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
