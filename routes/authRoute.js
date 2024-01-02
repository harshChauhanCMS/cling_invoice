const express = require('express');
const router = express.Router();

// Import controller
const login = require('../controllers/user/login');
const register = require('../controllers/user/register');
const addUserData = require('../controllers/user/addUserData');
const getUserData = require('../controllers/user/getUserDetails');
const getEmployees = require('../controllers/user/getEmployees');
const deleteUser = require('../controllers/user/deleteUser');
const changePassword = require('../controllers/auth/changePassword');

// Routes
router.post('/login', login);
router.post('/register', register);
router.post('/addUserData', addUserData);
router.post('/changePassword', changePassword);
router.get('/getUserData', getUserData);
router.get('/getEmployees', getEmployees);
router.delete('/deleteUser/:id', deleteUser);

module.exports = router;
