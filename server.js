const http = require('http');
const { createProxyServer } = require('http-proxy');
const os = require('os');

// Function to get the server's IP address
function getServerIp() {
    const networkInterfaces = os.networkInterfaces();
    for (const interface in networkInterfaces) {
        for (const address of networkInterfaces[interface]) {
            if (address.family === 'IPv4' && !address.internal) {
                return address.address; // Return the first external IPv4 address found
            }
        }
    }
    throw new Error('No external IPv4 address found');
}

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

// Get the server's IP address and set up the server
const proxyPort = 3000;
const proxyHost = getServerIp(); // Use the server's IP address

server.listen(proxyPort, proxyHost, () => {
    console.log(`Proxy server is running at http://${proxyHost}:${proxyPort} and forwarding to YouTube`);
});
