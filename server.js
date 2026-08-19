const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5500;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  // Parse URL, ignore query string and hash
  let reqPath = decodeURI(req.url.split('?')[0].split('#')[0]);
  if (reqPath === '/') reqPath = '/index.html';

  let filePath = path.join(ROOT, reqPath);

  // Check if direct file exists
  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      return sendFile(filePath, res);
    }

    // Try appending .html (clean URL support)
    const htmlPath = filePath + '.html';
    fs.stat(htmlPath, (err2, stats2) => {
      if (!err2 && stats2.isFile()) {
        return sendFile(htmlPath, res);
      }

      // Check if directory with index.html
      const dirIndexPath = path.join(filePath, 'index.html');
      fs.stat(dirIndexPath, (err3, stats3) => {
        if (!err3 && stats3.isFile()) {
          return sendFile(dirIndexPath, res);
        }

        // 404
        res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end('<h1>404 Not Found</h1><p>The page you requested does not exist.</p><p><a href="/">Go to Home</a></p>');
      });
    });
  });
});

function sendFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end('500 Internal Server Error');
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  SpreadPay local server running at:`);
  console.log(`  http://localhost:${PORT}`);
  console.log(`====================================================`);
});
