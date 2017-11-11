const fs = require("fs");
const assert = require("assert");

module.exports = (options = {}) => {
  options.prepend = options.prepend || "";
  options.env = options.env || "development";

  function asset_path(assetName) {
    assert(
      typeof assetName === "string",
      "assetName required, and must be a string"
    );
    assert(
      assetName.split.length > 1,
      "assetName should be similar to application.css or application.js"
    );

    const name = assetName.split(".")[0];
    const suffix = assetName.split(".")[1];

    let url = "";

    if (options.env === "development") {
      url = `${options.prepend}/${name}.${suffix}`;
      return url;
    }

    if (options.env === "production") {
      let manifest = {};
      try {
        const content = fs.readFileSync(options.manifestPath, "utf8");
        manifest = JSON.parse(content);
      } catch (e) {
        throw new Error(`can't manifest file from ${options.manifestPath}`);
      }
      url += options.prepend + manifest[name][suffix];
      return url;
    }

    return null;
  }

  return function (req, res , next) {
    res.locals.asset_path = asset_path;
    res.locals.production = process.env.NODE_ENV == "production";
    next();
  };
};
