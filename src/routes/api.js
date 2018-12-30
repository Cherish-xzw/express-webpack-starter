import express from 'express';
import homeController from '../controllers/home';
import { body } from 'express-validator/check';

export default function api() {
  const router = express.Router();
  router.post('/', [body('message').isString()], homeController.message);
  return router;
}
