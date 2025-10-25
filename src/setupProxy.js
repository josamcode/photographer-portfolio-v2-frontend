const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  const proxyTarget = process.env.REACT_APP_PROXY_TARGET || 'http://localhost:5000';

  app.use(
    '/api',
    createProxyMiddleware({
      target: proxyTarget,
      changeOrigin: true,
      secure: false,
    })
  );
};
