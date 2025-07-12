import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  const images = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    category: ['Event', 'Training', 'Workshop'][i % 3]
  }));

  const openLightbox = (id) => {
    setSelectedImage(id);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 text-center bg-gradient-to-r from-blue-800 to-indigo-900 text-white"
      >
        <motion.h1 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Our Gallery
        </motion.h1>
        <p className="text-xl max-w-3xl mx-auto">
          Moments from our trainings, workshops, and events
        </p>
      </motion.div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
              onClick={() => openLightbox(image.id)}
            >
              {/* Placeholder for actual images */}
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <span className="text-white font-medium">{image.category} #{image.id}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative max-w-4xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-white text-3xl z-10"
              onClick={closeLightbox}
            >
              &times;
            </button>
            {/* Placeholder for actual lightbox image */}
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96" />
            <div className="text-white mt-4 text-center">
              <h3 className="text-xl font-bold">Gallery Image {selectedImage}</h3>
              <p>Event photos from our training sessions</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Gallery;