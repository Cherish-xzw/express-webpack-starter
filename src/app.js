import express from 'express';
import partials from 'express-partials';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import path from 'path';

import locals from './middlewares/locals';
import pages from './routes/pages';
import api from './routes/api';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// register application middleware
app.use(
  express.static(path.join(__dirname, '../public'), {
    maxage: 1000 * 60 * 60 * 24 * 30 // a month
  })
);
app.use(
  locals({
    asset: {
      env: process.env.NODE_ENV,
      publicPath: '/assets/',
      manifestPath: path.join(__dirname, '../public/assets', 'manifest.json')
    }
  })
);
app.use(compression());
app.use(partials());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(pages());
app.use('/api', api());

// proxy the webpack assets directory to the webpack-dev-server.
// It is only intended for use in development.
if (app.get('env') === 'development') {
  /* eslint-disable  global-require , import/no-extraneous-dependencies */
  const proxy = require('http-proxy-middleware');
  app.use(
    '/assets',
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
