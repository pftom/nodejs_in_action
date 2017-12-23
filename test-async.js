const fs = require('fs');

fs.readFile('./learning_async_programming/titles.json', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log('data', data.toString());
  }
})
