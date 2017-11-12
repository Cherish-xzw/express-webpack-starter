const fs = require("fs");
const assert = require("assert");

module.exports = function(options) {
  return function asset_path(assetName) {
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

    let url = `${options.prepend}`;

    if (options.env !== "production") {
      url += `${options.publicPath}${name}.${suffix}`;
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
      if (manifest[name]) {
        url += manifest[name][suffix];
      } else {
        url += options.publicPath + assetName;
      }
      return url;
    }

    return null;
  };
};
