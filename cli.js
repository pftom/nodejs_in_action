#!/Users/pftom/.nvm/versions/node/v9.3.0/bin node
// process object is available to every Node program and
// forms the basic for accept arguments when users run your programms.
const [nodePath, scriptPath, name] = process.argv;
console.log('Hello', nodePath, scriptPath, name);
