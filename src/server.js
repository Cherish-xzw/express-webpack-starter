/* eslint-disable no-use-before-define, no-console */

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

const content = fs.readFileSync(path.join(__dirname, "../public/assets/manifest.json"), "utf8");
app.set('assetsManifest', JSON.parse(content))

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

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
 * Listen on provided port, on all network interfaces.
 */
export default function startServer() {
  return new Promise((resolve, reject) => {
    server.listen(port, host);
    server.on('error', (error) => {
      if (error.syscall !== 'listen') {
        reject(error);
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
          reject(error);
      }
    });
    server.on('listening', () => {
      const addr = server.address();
      console.log(`express app started at http://${addr.address}:${addr.port}`);
      resolve();
    });
  });
}
