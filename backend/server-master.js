const { spawn } = require('child_process');

console.log("Iniciando Mestre: Subindo Usuários e Busca...");

const users = spawn('node', ['server-users.js']);
users.stdout.on('data', (data) => console.log(`Users: ${data}`));

const providers = spawn('node', ['server-providers.js']);
providers.stdout.on('data', (data) => console.log(`Providers: ${data}`));