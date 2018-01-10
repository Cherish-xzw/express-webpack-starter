const assetPath = require("../helpers/asset_path");

module.exports = (options = {}) => function(req, res, next) {
    res.locals.asset_path = assetPath(options);
    res.locals.production = process.env.NODE_ENV === "production";
    next();
  };
