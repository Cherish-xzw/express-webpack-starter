import express from 'express';
import homeController from '../controllers/home';
import userController from '../controllers/user';

export default function api() {
  const router = express.Router();
  router.post('/', homeController.message);
  router.post('/user/login', userController.login);
  router.get('/user/info', userController.info);
  router.post('/user/logout', userController.logout);
  router.get('/table/list', homeController.list);
  return router;
}
