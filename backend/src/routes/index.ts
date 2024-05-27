// define routes here
import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';

const router = express.Router();

// POST /create_user => UserController.createUser
router.post('/api/create_user', UsersController.createUser);

// POST /login => UserController.createUser
router.post('/api/login', UsersController.loginUser);

// GET /users => AppController.getStatus
router.get('/api/users', UsersController.getUsers);

// GET /user/:username => UserController.getUser
router.get('/api/user/:username', UsersController.getUser);

// GET /search results => AppController.getStatus
router.get('/api/search', AppController.getSearchResults);


export default router;