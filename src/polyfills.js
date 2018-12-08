/* eslint-disable global-require, no-console */

if (process.env.TAF_CONFIG) {
  process.env.NODE_ENV = 'production';
}

if (process.env.NODE_ENV === 'production') {
  require('source-map-support/register');
  require('babel-polyfill');
}

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  // send entire app down. Process manager will restart it
  process.exit(1);
});
