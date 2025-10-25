import React from 'react';
import { motion } from 'framer-motion';
import {
  HeartIcon,
  EyeIcon,
  CameraIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import config from '../config/config';

const PhotoCard = ({ photo, onClick, showDetails = true, viewMode = 'grid' }) => {
  const aspectClass = viewMode === 'masonry' ? '' : 'aspect-square';

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className={`relative overflow-hidden rounded-2xl bg-gray-900 ${aspectClass}`}>
        <img
          src={`${config.UPLOADS_URL}/${photo.filename}`}
          alt={photo.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

        {/* Hover Controls */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <HeartIcon className="h-5 w-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-4 bg-white/90 backdrop-blur-md text-black rounded-full hover:bg-white transition-colors"
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <EyeIcon className="h-5 w-5" />
            </motion.button>
          </div>
        </div>

        {/* Photo Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-white font-semibold text-lg mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {photo.title}
          </h3>

          {/* Tags */}
          {photo.tags && photo.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
              {photo.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-white/20 backdrop-blur-md text-white text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
              {photo.tags.length > 3 && (
                <span className="px-2 py-1 bg-white/20 backdrop-blur-md text-white text-xs rounded-full">
                  +{photo.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Camera Badge */}
        {photo.camera && (
          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="flex items-center px-3 py-1 bg-black/50 backdrop-blur-md text-white rounded-full text-xs">
              <CameraIcon className="h-3 w-3 mr-1" />
              {photo.camera}
            </div>
          </div>
        )}

        {/* Collection Badge */}
        {photo.collection && (
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="px-3 py-1 bg-white/20 backdrop-blur-md text-white rounded-full text-xs font-medium">
              {photo.collection.name}
            </div>
          </div>
        )}
      </div>

      {/* Details below image for grid view */}
      {showDetails && viewMode === 'grid' && (
        <div className="mt-4 space-y-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-black transition-colors duration-200">
            {photo.title}
          </h3>

          {photo.description && (
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {photo.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            {photo.tags && photo.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {photo.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
                {photo.tags.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{photo.tags.length - 2}
                  </span>
                )}
              </div>
            )}

            <div className="text-xs text-gray-500">
              {new Date(photo.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PhotoCard;