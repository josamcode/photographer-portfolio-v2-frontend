import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { CloudArrowUpIcon, XMarkIcon } from '@heroicons/react/24/outline';
import apiClient from '../../api/apiClient';
import { toast } from 'react-toastify';

const PhotoUpload = () => {
  const [collections, setCollections] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    collection: '',
    title: '',
    description: '',
    tags: '',
    camera: '',
    lens: '',
    aperture: '',
    shutter: '',
    iso: '',
    focalLength: ''
  });

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await apiClient.get('/api/collections/admin');
      setCollections(response.data);
    } catch (error) {
      toast.error('Error fetching collections');
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setSelectedFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: true
  });

  const removeFile = (index) => {
    setSelectedFiles(prev => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleUpload = async () => {
    if (!formData.collection) {
      toast.error('Please select a collection');
      return;
    }

    if (selectedFiles.length === 0) {
      toast.error('Please select at least one photo');
      return;
    }

    setUploading(true);

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const { file } = selectedFiles[i];
        const uploadFormData = new FormData();

        uploadFormData.append('photo', file);
        uploadFormData.append('collection', formData.collection);
        uploadFormData.append('title', formData.title || file.name);
        uploadFormData.append('description', formData.description);
        uploadFormData.append('tags', formData.tags);
        uploadFormData.append('camera', formData.camera);
        uploadFormData.append('lens', formData.lens);
        uploadFormData.append('aperture', formData.aperture);
        uploadFormData.append('shutter', formData.shutter);
        uploadFormData.append('iso', formData.iso);
        uploadFormData.append('focalLength', formData.focalLength);

        await apiClient.post('/api/photos/upload', uploadFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      toast.success(`Successfully uploaded ${selectedFiles.length} photo(s)`);

      // Reset form
      setSelectedFiles([]);
      setFormData({
        collection: formData.collection, // Keep selected collection
        title: '',
        description: '',
        tags: '',
        camera: '',
        lens: '',
        aperture: '',
        shutter: '',
        iso: '',
        focalLength: ''
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error uploading photos');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Photos</h2>
        <p className="text-gray-600">Add new photos to your collections</p>
      </div>

      {/* Collection Selection */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Collection *
        </label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={formData.collection}
          onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
        >
          <option value="">Choose a collection...</option>
          {collections.map((collection) => (
            <option key={collection._id} value={collection._id}>
              {collection.name}
            </option>
          ))}
        </select>
      </div>

      {/* File Upload Area */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ${isDragActive
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
            }`}
        >
          <input {...getInputProps()} />
          <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          {isDragActive ? (
            <p className="text-blue-600">Drop the files here...</p>
          ) : (
            <div>
              <p className="text-gray-600 mb-2">
                Drag & drop photos here, or click to select files
              </p>
              <p className="text-sm text-gray-500">
                Supports: JPEG, PNG, GIF, WebP
              </p>
            </div>
          )}
        </div>

        {/* Selected Files Preview */}
        {selectedFiles.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Selected Photos ({selectedFiles.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {selectedFiles.map((fileObj, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative group"
                >
                  <img
                    src={fileObj.preview}
                    alt={fileObj.file.name}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                  <p className="text-xs text-gray-500 mt-1 truncate">
                    {fileObj.file.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Photo Metadata Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Photo Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Photo title (optional)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="tag1, tag2, tag3"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-y"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Photo description (optional)"
            />
          </div>
        </div>

        {/* Camera Settings */}
        <div className="mt-6">
          <h4 className="text-md font-medium text-gray-900 mb-3">Camera Settings (Optional)</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Camera</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.camera}
                onChange={(e) => setFormData({ ...formData, camera: e.target.value })}
                placeholder="e.g., Canon EOS R5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lens</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.lens}
                onChange={(e) => setFormData({ ...formData, lens: e.target.value })}
                placeholder="e.g., 24-70mm f/2.8"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Aperture</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.aperture}
                onChange={(e) => setFormData({ ...formData, aperture: e.target.value })}
                placeholder="e.g., f/2.8"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shutter</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.shutter}
                onChange={(e) => setFormData({ ...formData, shutter: e.target.value })}
                placeholder="e.g., 1/60s"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ISO</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.iso}
                onChange={(e) => setFormData({ ...formData, iso: e.target.value })}
                placeholder="e.g., 800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Focal Length</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.focalLength}
                onChange={(e) => setFormData({ ...formData, focalLength: e.target.value })}
                placeholder="e.g., 50mm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Upload Button */}
      <div className="text-center">
        <button
          onClick={handleUpload}
          disabled={uploading || selectedFiles.length === 0 || !formData.collection}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {uploading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Uploading...
            </>
          ) : (
            <>
              <CloudArrowUpIcon className="h-5 w-5 mr-2" />
              Upload Photos
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PhotoUpload;