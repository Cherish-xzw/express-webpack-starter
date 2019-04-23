import express from 'express';
import apiCtrl from '../controllers/api';
import passport from '../middlewares/passport';

export default function api() {
  const router = express.Router();
  router.post('/login', apiCtrl.login);
  router.get('/logout', apiCtrl.logout);
  router.get('/user', passport.authenticate('jwt', { session: false }), apiCtrl.user);
  return router;
}
