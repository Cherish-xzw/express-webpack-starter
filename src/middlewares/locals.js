const moment = require('moment');
const assetPath = require('../helpers/asset_path');

module.exports = options =>
  function locals(req, res, next) {
    res.locals.asset_path = assetPath(req, options.asset);
    res.locals.production = req.app.get('env') === 'production';
    res.locals.moment = moment;
    next();
  };
