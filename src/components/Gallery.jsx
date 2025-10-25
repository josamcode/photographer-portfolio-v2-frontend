import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  InformationCircleIcon,
  HeartIcon,
  ShareIcon
} from '@heroicons/react/24/outline';
import PhotoCard from './PhotoCard';
import config from '../config/config';

const Gallery = ({ photos = [], viewMode = 'grid' }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  const openLightbox = (photo, index) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
    setShowInfo(false);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
    setShowInfo(false);
    document.body.style.overflow = 'unset';
  };

  const navigatePhoto = (direction) => {
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % photos.length
      : (currentIndex - 1 + photos.length) % photos.length;

    setCurrentIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!selectedPhoto) return;

      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          navigatePhoto('prev');
          break;
        case 'ArrowRight':
          navigatePhoto('next');
          break;
        case 'i':
        case 'I':
          setShowInfo(!showInfo);
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [selectedPhoto, currentIndex, showInfo]);

  if (!photos || photos.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">No photos available in this collection.</p>
      </div>
    );
  }

  const gridClass = viewMode === 'masonry'
    ? 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6'
    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';

  return (
    <>
      {/* Gallery Grid */}
      <div className={gridClass}>
        {photos.map((photo, index) => (
          <motion.div
            key={photo._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className={viewMode === 'masonry' ? 'break-inside-avoid mb-6' : ''}
          >
            <PhotoCard
              photo={photo}
              onClick={() => openLightbox(photo, index)}
              viewMode={viewMode}
            />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Header Controls */}
            <div className="absolute top-0 left-0 right-0 z-20 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowInfo(!showInfo);
                    }}
                    className="p-3 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-black/70 transition-colors"
                  >
                    <InformationCircleIcon className="h-6 w-6" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-black/70 transition-colors"
                  >
                    <HeartIcon className="h-6 w-6" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ShareIcon className="h-6 w-6" />
                  </motion.button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeLightbox}
                  className="p-3 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </motion.button>
              </div>
            </div>

            {/* Navigation Buttons */}
            {photos.length > 1 && (
              <>
                <motion.button
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigatePhoto('prev');
                  }}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 p-4 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-black/70 transition-all duration-200"
                >
                  <ChevronLeftIcon className="h-8 w-8" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigatePhoto('next');
                  }}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 p-4 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-black/70 transition-all duration-200"
                >
                  <ChevronRightIcon className="h-8 w-8" />
                </motion.button>
              </>
            )}

            {/* Main Image */}
            <div className="relative w-full h-full flex items-center justify-center p-20" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={selectedPhoto._id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={`${config.UPLOADS_URL}/${selectedPhoto.filename}`}
                alt={selectedPhoto.title}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Photo Counter */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
              <div className="px-4 py-2 bg-black/50 backdrop-blur-md text-white rounded-full text-sm font-medium">
                {currentIndex + 1} of {photos.length}
              </div>
            </div>

            {/* Photo Info Panel */}
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  initial={{ x: '100%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: '100%', opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="absolute right-0 top-0 bottom-0 w-full md:w-96 bg-white z-30 overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-8">
                    {/* Close button for mobile */}
                    <button
                      onClick={() => setShowInfo(false)}
                      className="absolute top-4 right-4 md:hidden p-2 text-gray-500 hover:text-gray-700"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>

                    <div className="space-y-6">
                      {/* Title and Description */}
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          {selectedPhoto.title}
                        </h3>
                        {selectedPhoto.description && (
                          <p className="text-gray-600 leading-relaxed">
                            {selectedPhoto.description}
                          </p>
                        )}
                      </div>

                      {/* Tags */}
                      {selectedPhoto.tags && selectedPhoto.tags.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Tags</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedPhoto.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Camera Information */}
                      {(selectedPhoto.camera || selectedPhoto.lens) && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Equipment</h4>
                          <div className="space-y-2 text-sm text-gray-600">
                            {selectedPhoto.camera && (
                              <div className="flex justify-between">
                                <span>Camera:</span>
                                <span className="font-medium text-gray-900">{selectedPhoto.camera}</span>
                              </div>
                            )}
                            {selectedPhoto.lens && (
                              <div className="flex justify-between">
                                <span>Lens:</span>
                                <span className="font-medium text-gray-900">{selectedPhoto.lens}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Camera Settings */}
                      {selectedPhoto.settings && Object.values(selectedPhoto.settings).some(v => v) && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Camera Settings</h4>
                          <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                            {selectedPhoto.settings.aperture && (
                              <div>
                                <span className="block text-xs text-gray-500">Aperture</span>
                                <span className="font-medium text-gray-900">{selectedPhoto.settings.aperture}</span>
                              </div>
                            )}
                            {selectedPhoto.settings.shutter && (
                              <div>
                                <span className="block text-xs text-gray-500">Shutter</span>
                                <span className="font-medium text-gray-900">{selectedPhoto.settings.shutter}</span>
                              </div>
                            )}
                            {selectedPhoto.settings.iso && (
                              <div>
                                <span className="block text-xs text-gray-500">ISO</span>
                                <span className="font-medium text-gray-900">{selectedPhoto.settings.iso}</span>
                              </div>
                            )}
                            {selectedPhoto.settings.focalLength && (
                              <div>
                                <span className="block text-xs text-gray-500">Focal Length</span>
                                <span className="font-medium text-gray-900">{selectedPhoto.settings.focalLength}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Collection Info */}
                      {selectedPhoto.collection && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Collection</h4>
                          <span className="inline-block px-3 py-1 bg-black text-white rounded-full text-sm">
                            {selectedPhoto.collection.name}
                          </span>
                        </div>
                      )}

                      {/* Date */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Date</h4>
                        <p className="text-gray-600 text-sm">
                          {new Date(selectedPhoto.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;