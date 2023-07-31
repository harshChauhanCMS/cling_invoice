const express = require('express');
const router = express.Router();

// Import controller
const findOneUser = require('../controllers/users/findOneUser');
const findAllUsers = require('../controllers/users/findAllUsers');
const updateUser = require('../controllers/users/updateUser');
const notifyUser = require('../controllers/users/notifyUser');

// Routes

/**
 * @openapi
 * /api/v1/users/findOne:
 *   post:
 *     summary: Get a single user
 *     description: Retrieve a single user by ID.
 *     tags: [Users]
 *     x-express-openapi-additional-middleware:
 *       - type: body
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: Single user object.
 */
router.post('/findOne', findOneUser);

/**
 * @openapi
 * /api/v1/users/findAll:
 *   get:
 *     summary: Get all users
 *     description: Retrieve all users.
 *     tags: [Users]
 *     headers: []
 *     responses:
 *       200:
 *         description: All Users Object
 */
router.get('/findAll', findAllUsers);

/**
 * @openapi
 * /api/v1/users/updateUser:
 *   patch:
 *     summary: Update a user
 *     description: Update a user by id.
 *     tags: [Users]
 *     x-express-openapi-additional-middleware:
 *       - type: body
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID of the user to update.
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               country_code:
 *                 type: string
 *               blood_group:
 *                 type: string
 *               emergency_contacts:
 *                 type: array
 *                 items:
 *                   type: string
 *               fcm_token:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated object.
 */
router.patch('/updateUser', updateUser);

/**
 * @openapi
 * /api/v1/users/notifyUser:
 *   post:
 *     summary: Notify user
 *     description: Notify user by id.
 *     tags: [Users]
 *     x-express-openapi-additional-middleware:
 *       - type: body
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: ID of the user.
 *               sticker_id:
 *                 type: string
 *                 description: ID of the sticker
 *     responses:
 *       200:
 *         description: Notify user object.
 */
router.post('/notifyUser', notifyUser);

module.exports = router;
