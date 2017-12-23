const http = require('http');
const fs = require('fs');
const path = require('path');
console.log('diranme', __dirname);

http.createServer((req, res) => {
  if (req.url === '/') {
    // the require relative path use this file as target
    // fs api relative path use process.cwd() as target
    // so, when use fs, do not use relative path, use absolute path
    // fs.readFile( './titles.json', (err, data) => { => // error
    fs.readFile(path.join(__dirname, './titles.json'), (err, data) => {
      if (err) {
        console.error(err);
        res.end('Server Error');
      } else {
        const titles = JSON.parse(data.toString());
        fs.readFile(path.join(__dirname, './template.html'), (err, data) => {
          if (err) {
            console.error(err);
            res.end('Server Error');
          } else {
            const tmpl = data.toString();
            const html = tmpl.replace('%', titles.join('</li><li>'));
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
          }
        });
      }
    });
  }
}).listen(8000, '127.0.0.1');

