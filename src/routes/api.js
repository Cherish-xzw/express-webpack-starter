import express from 'express';
import homeController from '../controllers/home';

export default function api() {
  const router = express.Router();
  router.post('/api', homeController.message);
  return router;
}
