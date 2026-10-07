const http = require('http');
const { execFile } = require('child_process');
const path = require('path');

const PORT = process.env.PORT || 8000;
const CHECK_INTERVAL_MS = 60 * 1000; // Vérification exacte toutes les 60 secondes

let isRunning = false;
let lastRunTime = null;
let lastRunStatus = 'En attente du premier cycle...';
let lastRunOutput = '';

function runPublisher() {
  if (isRunning) return;
  isRunning = true;
  const scriptPath = path.join(__dirname, 'publish-facebook-notion.js');

  execFile('node', [scriptPath], { env: process.env }, (error, stdout, stderr) => {
    isRunning = false;
    lastRunTime = new Date().toISOString();
    if (error) {
      lastRunStatus = `Erreur: ${error.message}`;
      lastRunOutput = stderr || stdout || error.message;
      console.error(`[${lastRunTime}] ❌ Erreur cycle Koyeb:`, error.message);
    } else {
      lastRunStatus = 'Succès (OK)';
      lastRunOutput = stdout;
      // N'afficher dans les logs Koyeb que s'il y a eu une publication ou toutes les 15 min
      if (stdout.includes('Post publié sur Facebook avec succès')) {
        console.log(`[${lastRunTime}] 🚀 PUBLICATION EFFECTUÉE :\n${stdout}`);
      }
    }
  });
}

// Serveur HTTP pour le Health Check obligatoire de Koyeb
const server = http.createServer((req, res) => {
  if (req.url === '/run') {
    runPublisher();
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ message: 'Vérification manuelle déclenchée !', lastRunTime }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({
    service: 'Aizeeeh Facebook-Notion Auto-Publisher (DIGITAL 514)',
    status: 'healthy',
    interval: '60s',
    lastRunTime,
    lastRunStatus,
    recentLogs: lastRunOutput ? lastRunOutput.split('\n').slice(-12) : []
  }, null, 2));
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Serveur Koyeb Aizeeeh actif sur le port ${PORT}`);
  console.log(`⏱️  Vérification automatique de Notion activée toutes les 60 secondes.`);
  runPublisher();
  setInterval(runPublisher, CHECK_INTERVAL_MS);
});
