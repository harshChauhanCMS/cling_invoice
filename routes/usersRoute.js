const express = require('express');
const router = express.Router();

// Import controller
const findOneUser = require('../controllers/users/findOneUser');
const findAllUsers = require('../controllers/users/findAllUsers');
const updateUser = require('../controllers/users/updateUser');
const notifyUser = require('../controllers/users/notifyUser');

// Routes
router.get('/findOne', findOneUser);
/**
 * @openapi
 * /api/v1/users/findAll:
 *   get:
 *     summary: Get a user
 *     description: Retrieve a user from the database.
 *     responses:
 *       200:
 *         description: A user object
 */
router.get('/findAll', findAllUsers);
router.patch('/updateUser', updateUser);
router.post('/notifyUser', notifyUser);

module.exports = router;
