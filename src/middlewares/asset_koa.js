const asset_path = require("../helpers/asset_path");

module.exports = (options = {}) => {
  return async (ctx, next) => {
    ctx.state.asset_path = asset_path(options);
    ctx.state.production = process.env.NODE_ENV == "production";
    await next();
  };
};
