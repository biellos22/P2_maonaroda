const http = require('http');
const httpProxy = require('http-proxy');
const { spawn } = require('child_process');

spawn('node', ['server-users.js'], { stdio: 'inherit', env: process.env });
spawn('node', ['server-providers.js'], { stdio: 'inherit', env: process.env });

const proxy = httpProxy.createProxyServer({ changeOrigin: true });

const server = http.createServer((req, res) => {
    if (req.url.startsWith('/api')) {
        if (req.url.startsWith('/api/providers')) {
            proxy.web(req, res, { target: 'http://localhost:5002' });
        } else {

            proxy.web(req, res, { target: 'http://localhost:5001' });
        }
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Gateway rodando na porta ${PORT}`));