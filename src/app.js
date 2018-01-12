import './polyfills';
import express from 'express';
import partials from 'express-partials';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import path from 'path';

import locals from './middlewares/locals';
import pages from './routes/pages';
import api from './routes/api';

const __PROD__ = process.env.NODE_ENV === 'production';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// registe application middleware
app.use(
  express.static(path.join(__dirname, '../public'), {
    maxage: 1000 * 60 * 60 * 24 * 30 // a month
  })
);
app.use(
  locals({
    asset: {
      env: process.env.NODE_ENV,
      prepend: __PROD__ ? '' : 'http://localhost:8080',
      publicPath: '/assets/',
      manifestPath: path.join(__dirname, '../public/assets', 'manifest.json')
    }
  })
);
app.use(compression());
app.use(partials());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(pages());
app.use(api());

app.listen(4000, () => {
  console.log('express app started at http://localhost:4000');
});

export default app;
