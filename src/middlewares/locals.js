const moment = require('moment');

module.exports = () =>
  function(req, res, next) {
    res.locals.moment = moment;
    next();
  };
