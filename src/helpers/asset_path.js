module.exports = function assetHelper(req, opt = {
  publicPath: "",
  prepend: ""
}) {
  return function assetPath(assetName) {
    const name = assetName.split(".")[0];
    const suffix = assetName.split(".")[1];
    let url = "";
    if (req.app.get('env') === "development") {
      url += `${opt.publicPath}${name}.${suffix}`;
    }
    if (req.app.get('env') === "production") {
      if (opt.prepend) {
        url += opt.prepend;
      }
      if( name in req.app.get('assetsManifest') ) {
        url += req.app.get('assetsManifest')[name][suffix];
      } else {
        url += `${opt.publicPath}${name}.${suffix}`;
      }
    }
    return url;
  };
}
