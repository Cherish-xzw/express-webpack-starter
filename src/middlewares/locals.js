const moment = require('moment');
const assetPath = require('../helpers/asset_path');

module.exports = options =>
  function locals(req, res, next) {
    res.locals.asset_path = assetPath(options.asset);
    res.locals.production = process.env.NODE_ENV === 'production';
    res.locals.moment = moment;
    next();
  };
