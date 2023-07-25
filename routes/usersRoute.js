const express = require('express');
const router = express.Router();

// Import controller
const findOneUser = require('../controllers/users/findOneUser');
const findAllUsers = require('../controllers/users/findAllUsers');
const updateUser = require('../controllers/users/updateUser');

// Routes
router.get('/findOne', findOneUser);
router.get('/findAll', findAllUsers);
router.patch('/updateUser', updateUser);

module.exports = router;
