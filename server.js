const http = require('http');
const fs = require('fs');
const path = require('path');

const dir = '/Users/victorgarcia/Documents/Recomp LP';
const port = 8080;

const mimeTypes = {
  'html': 'text/html',
  'css': 'text/css',
  'js': 'text/javascript',
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'gif': 'image/gif',
  'svg': 'image/svg+xml',
  'ico': 'image/x-icon',
};

http.createServer((req, res) => {
  const filePath = path.join(dir, req.url === '/' ? 'index.html' : req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      const ext = path.extname(filePath).slice(1);
      const contentType = mimeTypes[ext] || 'text/plain';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}).listen(port, () => {
  console.log(`Serving on http://localhost:${port}`);
});
