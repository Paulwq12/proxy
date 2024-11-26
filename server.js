const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Define the target server (this can be any valid URL)
const TARGET_SERVER = 'https://www.youtube.com'; // Example target server

// Create an Express app
const app = express();

// Proxy requests starting with /api to the target server
app.use('/api', createProxyMiddleware({
    target: TARGET_SERVER,
    changeOrigin: true,
    pathRewrite: {
        '^/api': '', // Remove `/api` from the forwarded request path
    },
}));

// Handle other routes
app.get('/', (req, res) => {
    res.send('Proxy Server is Running!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy server is running at http://localhost:${PORT}`);
});
