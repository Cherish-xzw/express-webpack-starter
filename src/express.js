const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");

const asset = require('./middlewares/asset_express');

const __PROD__ = process.env.NODE_ENV === "production";

const app = express();

app.set('views', path.resolve(__dirname, './views'));
app.set("view engine", ".hbs");
app.engine(
  ".hbs",
  exphbs({
    layoutsDir : __dirname  + "/views/layouts",
    defaultLayout: "layout",
    extname: ".hbs"
  })
);
app.use(express.static(path.join(__dirname, '../public'), {
  maxage: 1000 * 60 * 60 * 24 * 30, // a month
}));
app.use(asset({
  env: process.env.NODE_ENV,
  prepend: __PROD__ ? "" : "http://localhost:8080/assets",
  manifestPath: path.join(__dirname, '../public/assets', 'manifest.json'),
}));

app.get("/", function(req, res) {
  res.render("home", {
    title: "home"
  });
});

app.listen(4000, () => {
  console.log("express app started at http://localhost:4000");
});
