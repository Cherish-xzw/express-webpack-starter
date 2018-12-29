import server from './server';

const debug = require('debug')('app:index');

const startTime = Date.now();

debug('Starting server...');
server().then(() => {
  debug(`Server started in ${ (Date.now() - startTime ) / 1000} s`);
}).catch(error => {
  console.error('Start server error: ', error); // eslint-disable-line no-console
  setTimeout(() => {
    process.exit(1);
  }, 100);
});
