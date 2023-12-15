const express = require('express');
const router = express.Router();

// Import controller
const login = require('../controllers/user/login');
const register = require('../controllers/user/register');
const addUserData = require('../controllers/user/addUserData');
const getUserData = require('../controllers/user/getUserDetails');

// Routes
router.post('/login', login);
router.post('/register', register);
router.post('/addUserData', addUserData);
router.get('/getUserData', getUserData);

module.exports = router;
