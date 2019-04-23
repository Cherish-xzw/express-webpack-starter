import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = {
      userId: username
    };
    if (!user.userId) return done(null, false, {
      message: 'Invalid user'
    })
    return done(null, {
      token: jwt.sign(user, 'secret', { expiresIn: 60 * 60 * 1000 }),
    });
  } catch (error) {
    done(error);
  }
}));

passport.use(new JwtStrategy({
  // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
  secretOrKey: 'secret'
}, (payload, done) => {
  done(null, payload);
}));

export function isAuthenticatedPage() {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect(req.app.locals.basePath);
  }
}

export function isAuthenticatedAPI() {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({
      error: '401 Unauthorized'
    })
  }
}

export default passport;
