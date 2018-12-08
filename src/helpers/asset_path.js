module.exports = function assetHelper(req, opt = {
  basePath: "",
  prepend: ""
}) {
  return function assetPath(assetName) {
    const name = assetName.slice(0, assetName.lastIndexOf('.'));
    const suffix = assetName.slice(assetName.lastIndexOf('.') + 1);
    let url = "";
    if (req.app.get('env') === "development") {
      url += `${opt.basePath}${name}.${suffix}`;
    }
    if (req.app.get('env') === "production") {
      if (opt.prepend) {
        url += opt.prepend;
      }
      if( name in req.app.get('assetsManifest') ) {
        url += req.app.get('assetsManifest')[name][suffix];
      } else {
        url += `${opt.basePath}${name}.${suffix}`;
      }
    }
    return url;
  };
}
