import passport from "../middlewares/passport";

export default {
  login(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(401).json(info);
      req.logIn(user, (error) => {
        if (err) return next(error);
        res.json(user);
      });
    })(req, res, next);
  },

  logout(req, res) {
    req.logout();
    res.redirect(req.app.locals.basePath);
  },

  async user(req, res) {
    res.json(req.user);
  },
};
