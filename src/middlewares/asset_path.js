function assetHelper(req, opt = {
  basePath: "",
  prepend: ""
}) {
  return function assetPath(assetName) {
    const name = assetName.slice(0, assetName.lastIndexOf('.'));
    const suffix = assetName.slice(assetName.lastIndexOf('.') + 1);
    let url = "";
    if (opt.prepend) {
      url += opt.prepend;
    }
    if (name in req.app.get('assetsManifest')) {
      url += req.app.get('assetsManifest')[name][suffix];
    } else {
      url += `${opt.basePath}${name}.${suffix}`;
    }
    return url;
  };
}

export default function (options) {
  return function assetPath(req, res, next) {
    Object.assign(res.locals, {
      script: res.locals.script || '',
      asset_path: assetHelper(req, options),
    });
    next()
  };
}
