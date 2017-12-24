const EventEmitter = require('events').EventEmitter;
const net = require('net');
const channel = new EventEmitter();

// channel.on('error', err => {
//   console.log(`ERROR: ${err}`);
// });

process.on('unhandledRejection', err => {
  console.log(err.stack);
  // process.exit(1);
});

channel.emit('error');
