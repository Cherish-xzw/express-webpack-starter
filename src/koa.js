const koa = require("koa");
const hbs = require("koa-hbs");
const path = require("path");
const serve = require("koa-static");

const asset = require("./middlewares/asset_koa");

const app = new koa();

const __PROD__ = process.env.NODE_ENV === "production";

app.use(
  hbs.middleware({
    viewPath: __dirname + "/views",
    layoutsPath: __dirname + "/views/layouts",
    defaultLayout: "layout"
  })
);
app.use(serve(path.join(__dirname, "../public"), {
  maxage: 1000 * 60 * 60 * 24 * 30, // a month
}));
app.use(
  asset({
    env: process.env.NODE_ENV,
    prepend: __PROD__ ? "" : "http://localhost:8080/assets",
    manifestPath: path.join(__dirname, "../public/assets", "manifest.json")
  })
);

app.use(async function(ctx) {
  await ctx.render("home", { title: "home" });
});

app.listen(3000, () => {
  console.log("koa app started at http://localhost:3000");
});
