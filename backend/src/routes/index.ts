// define routes here
import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import passport from '../../config/passport';

const router = express.Router();

// POST /create_user => UserController.createUser
router.post('/api/create_user', UsersController.createUser);

// POST /login => UserController.loginUser with Passport.js authentication
router.post('/api/login', passport.authenticate('local', { session: false }), UsersController.loginUser);

// POST /logout => UserController.logoutUser with Passport.js authentication
router.post('/api/logout', passport.authenticate('jwt', { session: false }), UsersController.logoutUser);

// GET /users => UsersController.getUsers with Passport.js authentication
router.get('/api/users', passport.authenticate('jwt', { session: false }), UsersController.getUsers);

// GET /user/:username => UsersController.getUser with Passport.js authentication
router.get('/api/user/:username', passport.authenticate('jwt', { session: false }), UsersController.getUser);

// GET /search results => AppController.getSearchResults
router.get('/api/search', passport.authenticate('jwt', { session: false }), AppController.getSearchResults);


export default router;