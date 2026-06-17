// backend/server-master.js
const { spawn } = require('child_process');

function startService(scriptName) {
    console.log(`[MASTER] Tentando iniciar: ${scriptName}`);
    
    // O { stdio: 'inherit' } faz com que os logs dos filhos apareçam no log principal do Render
    const service = spawn('node', [scriptName], { stdio: 'inherit' });

    service.on('close', (code) => {
        console.error(`[MASTER] O serviço ${scriptName} parou com código ${code}. Reiniciando em 5 segundos...`);
        setTimeout(() => startService(scriptName), 5000);
    });
}

console.log("Iniciando Orquestrador Mestre...");
startService('server-users.js');
startService('server-providers.js');