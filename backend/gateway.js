const http = require('http');
const httpProxy = require('http-proxy');
const { spawn } = require('child_process');

spawn('node', ['server-users.js'], { stdio: 'inherit', env: process.env });
spawn('node', ['server-providers.js'], { stdio: 'inherit', env: process.env });

const proxy = httpProxy.createProxyServer({ changeOrigin: true });

const server = http.createServer((req, res) => {
    console.log(`Gateway recebeu: ${req.method} ${req.url}`);

    if (req.url.startsWith('/api/providers')) {
        proxy.web(req, res, { target: 'http://localhost:5002' });
    } 
    else if (req.url.startsWith('/api/login') || req.url.startsWith('/api/register')) {
        proxy.web(req, res, { target: 'http://localhost:5001' });
    } 
    else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

proxy.on('error', (err, req, res) => {
    console.error('Erro no Proxy:', err);
    res.writeHead(502);
    res.end('Bad Gateway');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Gateway rodando na porta ${PORT}`));