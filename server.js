const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.pdf': 'application/pdf'
};

function listen(port) {
  const server = http.createServer((req, res) => {
    let pathname;
    try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
    catch { res.writeHead(400); res.end('Bad request'); return; }

    const requested = pathname === '/' ? '/index.html' : pathname;
    const filePath = path.resolve(root, `.${requested}`);
    const relative = path.relative(root, filePath);
    if (relative.startsWith('..') || path.isAbsolute(relative)) {
      res.writeHead(403); res.end('Forbidden'); return;
    }

    fs.stat(filePath, (statError, stat) => {
      if (statError || !stat.isFile()) { res.writeHead(404); res.end('Not found'); return; }
      res.writeHead(200, {
        'Content-Type': mime[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'no-cache'
      });
      fs.createReadStream(filePath).pipe(res);
    });
  });

  server.on('error', error => {
    if (error.code === 'EADDRINUSE') listen(port + 1);
    else throw error;
  });
  server.listen(port, '127.0.0.1', () => console.log(`Reader ready at http://localhost:${port}`));
}

listen(Number(process.env.PORT) || 4173);
