import express from 'express';
import { getSavedViews, createSavedView, deleteSavedView } from '../controllers/savedViewController.js';

const router = express.Router();

router.route('/')
  .get(getSavedViews)
  .post(createSavedView);

router.route('/:id')
  .delete(deleteSavedView);

export default router;