const app = require('connect');
const logger = require('./logger');
const errHandler = require('./errorHandler');

function hello(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('hello world');
}

app()
  .use((req, res) => {
    foo();
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello world');
  })
  .use(errHandler)
  .listen(3000);
