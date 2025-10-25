import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  PlayIcon,
  ArrowRightIcon,
  StarIcon,
  CameraIcon,
  EyeIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import apiClient from '../api/apiClient';

const Home = () => {
  const [featuredCollections, setFeaturedCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 150]);
  const y2 = useTransform(scrollY, [0, 300], [0, -150]);

  useEffect(() => {
    fetchFeaturedCollections();
  }, []);

  const fetchFeaturedCollections = async () => {
    try {
      const response = await apiClient.get('/api/collections');
      // Ensure response.data is an array before slicing
      const collections = Array.isArray(response.data) ? response.data : [];
      setFeaturedCollections(collections.slice(0, 6));
    } catch (error) {
      console.error('Error fetching collections:', error);
      // Set empty array as fallback
      setFeaturedCollections([]);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { icon: CameraIcon, number: "500+", label: "Photos Captured" },
    { icon: EyeIcon, number: "50K+", label: "Views Monthly" },
    { icon: HeartIcon, number: "1K+", label: "Happy Clients" },
    { icon: StarIcon, number: "5.0", label: "Average Rating" }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background with Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

          {/* Animated Background Elements */}
          <motion.div
            style={{ y: y1 }}
            className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-3xl"
          />
          <motion.div
            style={{ y: y2 }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/80 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Available for bookings
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-5xl md:text-8xl font-bold text-white mb-8 leading-tight"
          >
            Capturing
            <span className="block bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Moments
            </span>
            <span className="block text-4xl md:text-6xl font-light text-white/80">
              That Last Forever
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Professional photographer specializing in portrait, landscape, and event photography.
            Every frame tells a story, every shot captures emotion.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link
              to="/portfolio"
              className="group relative inline-flex items-center px-8 py-4 bg-white text-black rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <span className="mr-2">View Portfolio</span>
              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <button className="group inline-flex items-center px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/50">
              <PlayIcon className="h-5 w-5 mr-2" />
              Watch Showreel
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <stat.icon className="h-8 w-8 text-amber-400 mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.number}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Collections */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-4">
              Featured Work
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Latest Collections
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover my most recent photography projects, each telling a unique story through the lens of creativity and passion
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-300 aspect-square rounded-2xl mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.isArray(featuredCollections) && featuredCollections.length > 0 ? (
                featuredCollections.map((collection, index) => (
                  <motion.div
                    key={collection._id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <Link to={`/portfolio/${collection._id}`}>
                      <div className="relative overflow-hidden rounded-2xl bg-gray-900 aspect-square">
                        {collection.coverImage ? (
                          <img
                            src={`/api/uploads/${collection.coverImage}`}
                            alt={collection.name}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                            <CameraIcon className="h-16 w-16 text-white/50" />
                          </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {collection.name}
                          </h3>
                          <p className="text-white/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            {collection.description || 'Explore this beautiful collection of photographs.'}
                          </p>

                          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                            <div className="inline-flex items-center text-white font-medium">
                              View Collection
                              <ArrowRightIcon className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-20">
                  <CameraIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-xl">No collections available yet.</p>
                </div>
              )}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center px-8 py-4 bg-black text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              Explore All Work
              <ArrowRightIcon className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/10 via-transparent to-purple-500/10" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/80 text-sm font-medium mb-6">
                About the Artist
              </div>

              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Passion Meets
                <span className="block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Perfection
                </span>
              </h2>

              <div className="space-y-6 text-lg text-white/80 leading-relaxed">
                <p>
                  With over a decade of experience in professional photography, I specialize in capturing the essence of life's most precious moments. My work spans across portrait, landscape, and event photography.
                </p>
                <p>
                  Every photograph is an opportunity to freeze time, to capture emotion, and to create art that resonates with the viewer long after they've looked away. I believe in the power of visual storytelling.
                </p>
                <p>
                  From intimate weddings to grand corporate events, from breathtaking landscapes to compelling portraits, my lens captures the beauty in every moment.
                </p>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row gap-6">
                <Link
                  to="/portfolio"
                  className="inline-flex items-center px-8 py-4 bg-white text-black rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                >
                  View Portfolio
                  <ArrowRightIcon className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>

                <button className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold transition-all duration-300 hover:bg-white/10 hover:border-white/50">
                  Get In Touch
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10">
                <div className="aspect-w-4 aspect-h-5 rounded-2xl overflow-hidden bg-gradient-to-br from-amber-400 to-orange-600 p-1">
                  <div className="w-full h-96 rounded-2xl flex items-center justify-center"
                    style={{
                      backgroundImage: "url('/image.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat"
                    }}
                  >
                    <div className="text-center">
                      {/* <CameraIcon className="h-20 w-20 text-white/50 mx-auto mb-4" /> */}
                      {/* <span className="text-white/70 text-xl font-medium">Photographer Portrait</span> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Background decorative elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-r from-amber-500/30 to-orange-500/30 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Ready to Create
              <span className="block">Something Amazing?</span>
            </h2>

            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Let's work together to capture your special moments and create memories that will last forever.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/portfolio"
                className="inline-flex items-center px-8 py-4 bg-white text-black rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group"
              >
                View My Work
                <ArrowRightIcon className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>

              <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white/10">
                Book a Session
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;