// eslint-disable-next-line import/no-extraneous-dependencies
const { createProxyMiddleware } = require('http-proxy-middleware');

const IS_PROD = process.env.NODE_ENV === 'production';

const PORT = process.env.PORT || 8080;

// eslint-disable-next-line func-names
module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: IS_PROD ? '' : `http://localhost:${PORT}`,
            changeOrigin: true,
        })
    );
};
