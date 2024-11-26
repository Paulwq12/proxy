const http = require('http');
const { createProxyServer } = require('http-proxy');

// Create a proxy server
const proxy = createProxyServer({
  target: 'https://www.youtube.com',
  changeOrigin: true,
  secure: false // Set to true if you want to verify SSL certificates
});

// Create an HTTP server that listens for incoming requests
const server = http.createServer((req, res) => {
  proxy.web(req, res, (err) => {
    console.error('Proxy error:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Something went wrong with the proxy.');
  });
});

// Specify the IP address and port for the proxy server
const proxyPort = 3000;
const proxyHost = '0.0.0.0'; // Listen on all interfaces

server.listen(proxyPort, proxyHost, () => {
  console.log(`Proxy server is running at http://${proxyHost}:${proxyPort} and forwarding to YouTube`);
});
