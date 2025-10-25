// Environment configuration
const config = {
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  UPLOADS_URL: process.env.REACT_APP_UPLOADS_URL || 'http://localhost:5000/api/uploads',
  // Production API URL
  PRODUCTION_API_URL: 'https://photographer-portfolio-v2-backend-production.up.railway.app',
  PRODUCTION_UPLOADS_URL: 'https://photographer-portfolio-v2-backend-production.up.railway.app/api/uploads'
};

// Use production URLs if we're in production
if (process.env.NODE_ENV === 'production') {
  config.API_URL = config.PRODUCTION_API_URL;
  config.UPLOADS_URL = config.PRODUCTION_UPLOADS_URL;
}

export default config;
