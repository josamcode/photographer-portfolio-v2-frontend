// Environment configuration
const config = {
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  UPLOADS_URL: process.env.REACT_APP_UPLOADS_URL || 'http://localhost:5000/api/uploads'
};

export default config;
