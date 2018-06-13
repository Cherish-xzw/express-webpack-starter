import express from 'express';
import partials from 'express-partials';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import path from 'path';
import history from 'connect-history-api-fallback';
import pkg from '../package.json';

import locals from './middlewares/locals';
import pages from './routes/pages';
import api from './routes/api';

const app = express();
const appPath = `${pkg.path === '/' ? '' : pkg.path}`;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// use before static middleware to compress static files
app.use(compression());
// register application middleware
app.use(
  appPath,
  express.static(path.join(__dirname, '../public'), {
    maxage: 1000 * 60 * 60 * 24 * 30 // a month
  })
);
app.use(
  locals({
    asset: {
      publicPath: `${appPath}/assets/`,
      // prepend: '//cdn.upchina.com' // If assets have been uploaded to cdn
    }
  })
);
app.use(partials());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
// HTML5 history api fallback for SPA
app.use(appPath,history({
  index : '/',
  rewrites:[{
    from: /^\/api\/.*$/,
    to:(context) => context.parsedUrl.pathname
  }]
}))
app.use(appPath, pages());
app.use(`${appPath}/api`, api());

// proxy the webpack assets directory to the webpack-dev-server.
// It is only intended for use in development.
if (app.get('env') === 'development') {
  /* eslint-disable  global-require , import/no-extraneous-dependencies */
  const proxy = require('http-proxy-middleware');
  app.use(
    `${appPath}/assets/`,
    proxy({
      target: 'http://localhost:3808'
    })
  );
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error(`Not Found ${req.originalUrl}`);
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
