// define routes here
import express from 'express';
import AppController from '../controllers/AppController.js';

const router = express.Router();

// GET /search results => AppController.getStatus
router.get('/search', AppController.getSearchResults);


export default router;