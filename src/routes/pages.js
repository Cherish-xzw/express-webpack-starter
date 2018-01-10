import express from 'express';
import homeController from '../controllers/home';

export default function pages() {
  const router = express.Router();
  router.get('/', homeController.index);
  router.get('/about', homeController.about);
  return router;
}
