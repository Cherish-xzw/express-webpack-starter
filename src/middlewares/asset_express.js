const asset_path = require("../helpers/asset_path");

module.exports = (options = {}) => {
  return function(req, res, next) {
    res.locals.asset_path = asset_path(options);
    res.locals.production = process.env.NODE_ENV == "production";
    next();
  };
};
