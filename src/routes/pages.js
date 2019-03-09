import express from 'express';
import pagesCtrl from '../controllers/pages';

export default function pages() {
  const router = express.Router();
  router.get('/', pagesCtrl.index);
  router.get('/about', pagesCtrl.about);
  return router;
}
