const fs = require('fs');
const log = (message) => {
  fs.appendFileSync('refresh.log', `[${new Date().toISOString()}] ${message}\n`);
};

module.exports = { log };