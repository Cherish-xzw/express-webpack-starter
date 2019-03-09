import server from './server';

const debug = require('debug')('app:index');

const startTime = Date.now();

async function bootstrap() {
  debug('Starting server...');
  try {
    await server()
    debug(`Server started in ${ (Date.now() - startTime ) / 1000} s`);
  } catch (error) {
    console.error('Start server error: ', error); // eslint-disable-line no-console
    setTimeout(() => {
      process.exit(1);
    }, 100);
  }
}
bootstrap();
