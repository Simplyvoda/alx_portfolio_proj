// define routes here
import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';

const router = express.Router();

// POST /create_user => UserController.createUser
router.post('/api/create_user', UsersController.createUser);

// GET /search results => AppController.getStatus
router.get('/api/search', AppController.getSearchResults);


export default router;