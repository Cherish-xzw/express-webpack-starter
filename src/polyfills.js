/* eslint-disable global-require */
if (process.env.TAF_CONFIG) {
  process.env.NODE_ENV = 'production';
}
if (process.env.NODE_ENV === 'production') {
  require('source-map-support/register');
  require('babel-polyfill');
}
