import express from 'express';
import apiCtrl from '../controllers/api';
import { body } from 'express-validator/check';

export default function api() {
  const router = express.Router();
  router.post('/', [body('message').isString()], apiCtrl.message);
  return router;
}
