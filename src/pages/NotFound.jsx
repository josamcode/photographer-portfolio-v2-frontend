import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CameraIcon,
  HomeIcon,
  ArrowLeftIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              className="w-24 h-24 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <CameraIcon className="h-12 w-12 text-black" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-8xl md:text-9xl font-bold text-white mb-4 leading-none">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frame Not Found
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            Looks like this shot is out of focus. The page you're looking for doesn't exist or has been moved to a different album.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6"
        >
          {/* Search Suggestion */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-center mb-4">
              <MagnifyingGlassIcon className="h-6 w-6 text-amber-500 mr-2" />
              <span className="text-white font-medium">Try searching for something else</span>
            </div>
            <div className="flex max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search photos, collections..."
                className="flex-1 px-4 py-3 bg-black/30 border border-white/20 rounded-l-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-medium rounded-r-xl hover:from-amber-600 hover:to-orange-600 transition-colors duration-200">
                Search
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="group inline-flex items-center px-8 py-4 bg-white text-black rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <HomeIcon className="h-5 w-5 mr-2" />
              Back to Home
            </Link>

            <Link
              to="/portfolio"
              className="group inline-flex items-center px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/50"
            >
              <CameraIcon className="h-5 w-5 mr-2" />
              View Portfolio
            </Link>
          </div>

          {/* Back Button */}
          <motion.button
            onClick={() => window.history.back()}
            whileHover={{ x: -5 }}
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-200"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Go back to previous page
          </motion.button>
        </motion.div>

        {/* Popular Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-white/20"
        >
          <h3 className="text-white font-medium mb-4">Popular Pages</h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">
              Home
            </Link>
            <Link to="/portfolio" className="text-gray-400 hover:text-white transition-colors duration-200">
              Portfolio
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              About
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              Contact
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              Services
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;