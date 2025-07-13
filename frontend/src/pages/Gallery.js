import React, { useState } from 'react';
import { motion } from 'framer-motion';


// Example images — you can replace URLs or use `require()` for local assets
const imageList = [
  {
    id: 1,
    src: 'https://lh3.googleusercontent.com/p/AF1QipPdF1ULFTSxiU3RGFURn1ZCDKt8tsPdg-nNNDNy=s1360-w1360-h1020-rw',
    category: 'Event'
  },
  {
    id: 2,
    src: 'https://lh3.googleusercontent.com/p/AF1QipPEd7dmKqNr1IJkY3-x4EqnrGLNcU1DRPY3WO7n=s1360-w1360-h1020-rw',
    category: 'Training'
  },
  {
    id: 3,
    src: 'https://lh3.googleusercontent.com/p/AF1QipPiWvOttoiP2Kk2Wl2g_7ezxfQr-WO5CPbYZJku=s1360-w1360-h1020-rw',
    category: 'Workshop'
  },
  {
    id: 4,
    src: 'https://lh3.googleusercontent.com/p/AF1QipMKn8P7o5UeKgF9ld564MgpX9Asd8pf48GCX-rS=s1360-w1360-h1020-rw',
    category: 'Event'
  },
  {
    id: 5,
    src: 'https://lh3.googleusercontent.com/p/AF1QipNbVxi5gDs_jmFTuPJE5tFTkk0pmcW3pCHPPTQ0=s1360-w1360-h1020-rw',
    category: 'Training'
  },
  {
    id: 6,
    src: 'https://lh3.googleusercontent.com/p/AF1QipNm6iAbBZJ5jCTgcZFO5CGj2pw3WhgRMoath0D-=s1360-w1360-h1020-rw',
    category: 'Workshop'
  },
  {
    id: 7,
    src: 'https://lh3.googleusercontent.com/p/AF1QipNSPrL5WgfED0z2hro403kmlUh5Gwso5q6ocbOw=s1360-w1360-h1020-rw',
    category: 'Event'
  },
  {
    id: 8,
    src: 'https://lh3.googleusercontent.com/p/AF1QipP687T_DpEulzu8F3LZrjVyMJdxNmqweaKH5pPn=s1360-w1360-h1020-rw',
    category: 'Training'
  },
  {
    id: 9,
    src: 'https://lh3.googleusercontent.com/p/AF1QipPPcggonFMh3r1HwA3qZxOd7w0UtV0VXkaObqaY=s1360-w1360-h1020-rw',
    category: 'Workshop'
  },
];

const Gallery = ({ onAuthOpen }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox = (image) => setSelectedImage(image);
  const closeLightbox = () => setSelectedImage(null);

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-blue-50 to-white">

      {/* Hero */}
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
          {imageList.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
              onClick={() => openLightbox(image)}
            >
              <img
                src={image.src}
                alt={`Gallery ${image.id}`}
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <span className="text-white font-medium">
                  {image.category} #{image.id}
                </span>
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
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white text-3xl z-10"
              onClick={closeLightbox}
            >
              &times;
            </button>
            <img
              src={selectedImage.src}
              alt={`Gallery ${selectedImage.id}`}
              className="w-full h-96 object-cover rounded-xl"
            />
            <div className="text-white mt-4 text-center">
              <h3 className="text-xl font-bold">Gallery Image {selectedImage.id}</h3>
              <p>{selectedImage.category} event photo from our archives</p>
            </div>
          </motion.div>
        </motion.div>
      )}

    </div>
  );
};

export default Gallery;
