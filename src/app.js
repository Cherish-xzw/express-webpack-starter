import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import pkg from '../package.json';

import api from './routes/api';

const app = express();
const appPath = `${pkg.path === '/' ? '' : pkg.path}`;

app.use(compression());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(`${appPath}/api`, api());

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
});

export default app;
