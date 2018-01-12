const PrettyError = require('pretty-error');

const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

module.exports = () =>
  function errorHandler(err, req, res) {
    /* eslint no-console : off */
    console.error(pe.render(err));
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  };
