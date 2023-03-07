const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(App) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.opensea.io'
      changeOrigin: true,
    })
  );
};
