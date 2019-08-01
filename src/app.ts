import * as express from "express";
import * as partials from "express-partials";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as compression from "compression";
import * as helmet from "helmet";
import * as cookieSession from "cookie-session";
import * as validator from "express-validator";
import * as path from "path";
import * as moment from "moment";

import assetPath from "./middlewares/asset_path";
import passport from "./middlewares/passport";
import pages from "./routes/pages";
import api from "./routes/api";

const app = express();
const basePath = "/";

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("trust proxy", 1); // trust first proxy

// set locals
app.locals.moment = moment;
app.locals.basePath = basePath;
app.locals.production = app.get("env") === "production";

// use before static middleware to compress static files
app.use(compression());
app.use(helmet());
// register application middleware
app.use(
  basePath,
  express.static(path.join(__dirname, "../public"), {
    maxAge: 1000 * 60 * 60 * 24 * 30 // a month
  })
);
app.use(
  assetPath({
    basePath: `assets/`,
    // prepend: '//cdn.upchina.com' // If assets have been uploaded to cdn
  })
);
app.use(partials());
app.use(validator());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cookieSession({
  name: "session",
  keys: ["secret"],
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(basePath, pages());
app.use(`${basePath}api`, api());

// proxy the webpack assets directory to the webpack-dev-server.
// It is only intended for use in development.
if (!app.locals.production) {
  /* eslint-disable  global-require , import/no-extraneous-dependencies */
  const proxy = require("http-proxy-middleware");
  app.use(
    `${basePath}assets/`,
    proxy({
      target: "http://localhost:3808"
    })
  );
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err: any = new Error(`Not Found ${req.originalUrl}`);
  err.status = 404;
  next(err);
});

// error handler
app.use((err: any, req: express.Request, res: express.Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = !app.locals.production ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
