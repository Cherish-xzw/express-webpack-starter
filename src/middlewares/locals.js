const moment = require('moment');
const assetPath = require('../helpers/asset_path');
const pkg = require('../../package.json');

module.exports = options =>
  function locals(req, res, next) {
    Object.assign(res.locals, {
      production: req.app.get('env') === 'production',
      script: res.locals.script || '',
      asset_path: assetPath(req, options.asset),
      basePath: pkg.basePath,
      moment,
    });
    next()
  };
