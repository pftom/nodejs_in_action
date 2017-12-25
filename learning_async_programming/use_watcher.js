const path = require('path');
const fs = require('fs');

const Watcher = require('./Watcher');

// defined watchDir and processedDir
const watchDir = path.join(__dirname, '../hello_express/');
const processedDir = path.join(__dirname, '../watched_hello_express/');

const watcher = new Watcher(watchDir, processedDir);
watcher.on('process', (file) => {
  const watchFile = `${watchDir}/${file}`;
  const processedFile = `${processedDir}/${file.toLowerCase()}`;
  fs.rename(watchFile, processedFile, err => {
    if (err) throw err;
  });
});

watcher.start();
