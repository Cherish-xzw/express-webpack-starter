/* eslint-disable no-use-before-define */
/* eslint-disable no-console */

/**
 * Module dependencies.
 */
import './polyfills';
import app from './app';
import http from 'http';
import fs from 'fs';
import path from 'path';

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.HTTP_PORT || '3000');
const host = process.env.HTTP_IP || '0.0.0.0';
app.set('port', port);

/**
 * Cache the assets manifest
 */

if (app.get('env') === "production") {
  const content = fs.readFileSync(path.join(__dirname, "../public/assets/manifest.json"), "utf8");
  app.set('assetsManifest', JSON.parse(content))
}

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, host);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const _port = parseInt(val, 10);

  if (Number.isNaN(_port)) {
    // named pipe
    return val;
  }

  if (_port >= 0) {
    // port number
    return _port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  console.log(`express app started at http://${addr.address}:${addr.port}`);
}
