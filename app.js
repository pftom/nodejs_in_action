// core modules
const fs = require('fs');
const zlib = require('zlib');
const gzip = zlib.createGzip();

// stream module
const outStream = fs.createWriteStream('output.js.gz');

fs.createReadStream('./test.txt')
  .pipe(gzip)
  .pipe(outStream);
