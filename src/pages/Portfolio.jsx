import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FunnelIcon,
  Squares2X2Icon,
  ViewColumnsIcon,
  CameraIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';
import Gallery from '../components/Gallery';

const Portfolio = () => {
  const { collectionId } = useParams();
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // grid, masonry
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPhotos, setFilteredPhotos] = useState([]);

  useEffect(() => {
    fetchCollections();
  }, []);

  useEffect(() => {
    if (collectionId && collections.length > 0) {
      const collection = collections.find(c => c._id === collectionId);
      if (collection) {
        setSelectedCollection(collection);
        fetchPhotos(collectionId);
      }
    } else if (collections.length > 0 && !collectionId) {
      setSelectedCollection(null);
      fetchAllPhotos();
    }
  }, [collectionId, collections]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = photos.filter(photo =>
        photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredPhotos(filtered);
    } else {
      setFilteredPhotos(photos);
    }
  }, [searchTerm, photos]);

  const fetchCollections = async () => {
    try {
      const response = await axios.get('/api/collections');
      // Ensure response.data is an array
      const collectionsData = Array.isArray(response.data) ? response.data : [];
      setCollections(collectionsData);
    } catch (error) {
      console.error('Error fetching collections:', error);
      // Set empty array as fallback
      setCollections([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPhotos = async (collectionId) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/photos/collection/${collectionId}`);
      // Ensure response.data is an array
      const photosData = Array.isArray(response.data) ? response.data : [];
      setPhotos(photosData);
    } catch (error) {
      console.error('Error fetching photos:', error);
      // Set empty array as fallback
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllPhotos = async () => {
    try {
      setLoading(true);
      const allPhotos = [];
      for (const collection of collections) {
        const response = await axios.get(`/api/photos/collection/${collection._id}`);
        // Ensure response.data is an array before spreading
        const photosData = Array.isArray(response.data) ? response.data : [];
        allPhotos.push(...photosData);
      }
      setPhotos(allPhotos);
    } catch (error) {
      console.error('Error fetching all photos:', error);
      // Set empty array as fallback
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCollectionSelect = (collection) => {
    setSelectedCollection(collection);
    setSearchTerm('');
    if (collection) {
      fetchPhotos(collection._id);
    } else {
      fetchAllPhotos();
    }
  };

  if (loading && collections.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-0">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/80 text-sm font-medium mb-6">
              <CameraIcon className="h-4 w-4 mr-2" />
              Professional Portfolio
            </div>

            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
              My Portfolio
            </h1>

            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              A curated collection of my finest work, showcasing the art of visual storytelling
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-8 bg-white shadow-sm sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Collection Filters */}
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCollectionSelect(null)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${!selectedCollection
                  ? 'bg-black text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                All Photos ({photos.length})
              </motion.button>

              {Array.isArray(collections) && collections.map((collection) => (
                <motion.button
                  key={collection._id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCollectionSelect(collection)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${selectedCollection?._id === collection._id
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {collection.name}
                </motion.button>
              ))}
            </div>

            {/* Search and View Controls */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search photos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-full transition-colors duration-200 ${viewMode === 'grid' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
                    }`}
                >
                  <Squares2X2Icon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('masonry')}
                  className={`p-2 rounded-full transition-colors duration-200 ${viewMode === 'masonry' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
                    }`}
                >
                  <ViewColumnsIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collection Info */}
      <AnimatePresence>
        {selectedCollection && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="py-12 bg-gradient-to-r from-gray-50 to-white"
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {selectedCollection.name}
              </h2>
              {selectedCollection.description && (
                <p className="text-lg text-gray-600 leading-relaxed">
                  {selectedCollection.description}
                </p>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Photo Count and Results */}
      <section className="py-6 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {loading ? (
                'Loading...'
              ) : (
                <>
                  Showing {filteredPhotos.length} of {photos.length} {photos.length === 1 ? 'photo' : 'photos'}
                  {searchTerm && (
                    <span className="ml-2">
                      for "<span className="font-medium text-black">{searchTerm}</span>"
                    </span>
                  )}
                </>
              )}
            </p>

            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-sm text-gray-500 hover:text-black transition-colors duration-200"
              >
                Clear search
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className={`grid gap-6 ${viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}>
              {[...Array(12)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className={`bg-gray-300 rounded-2xl ${viewMode === 'masonry'
                    ? `h-${60 + (index % 3) * 20}`
                    : 'aspect-square'
                    }`}></div>
                  <div className="mt-4 space-y-2">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPhotos.length > 0 ? (
            <Gallery photos={filteredPhotos} viewMode={viewMode} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <CameraIcon className="h-20 w-20 text-gray-300 mx-auto mb-6" />
              {searchTerm ? (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No photos found for "{searchTerm}"
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search terms or browse all photos.
                  </p>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="inline-flex items-center px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-200"
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No photos available
                  </h3>
                  <p className="text-gray-600">
                    {selectedCollection
                      ? 'This collection is empty.'
                      : 'No photos have been uploaded yet.'
                    }
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Load More / Pagination could go here */}
      {filteredPhotos.length > 20 && (
        <section className="py-12 text-center">
          <button className="inline-flex items-center px-8 py-4 bg-black text-white rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-800 hover:scale-105">
            Load More Photos
          </button>
        </section>
      )}
    </div>
  );
};

export default Portfolio;