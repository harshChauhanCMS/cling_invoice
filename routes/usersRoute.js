const express = require('express');
const router = express.Router();

// Import controller
const findOneUser = require('../controllers/users/findOneUser');
const findAllUsers = require('../controllers/users/findAllUsers');
const updateUser = require('../controllers/users/updateUser');
const notifyUser = require('../controllers/users/notifyUser');
const searchUser = require('../controllers/users/searchUser');

// Routes

/**
 * @openapi
 * /api/v1/users/findOne:
 *   get:
 *     summary: Get a single user
 *     description: Retrieve a single user by ID.
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: _id
 *         schema:
 *           type: string
 *         description: ID of the user to retrieve.
 *         required: true
 *     responses:
 *       200:
 *         description: Single user object.
 */
router.get('/findOne', findOneUser);

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
 *   post:
 *     summary: Update a user
 *     description: Update a user by ID.
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
 *                   type: object
 *                   properties:
 *                     relation:
 *                       type: string
 *                     phone_number:
 *                       type: string
 *               fcm_token:
 *                 type: string
 *               gender:
 *                 type: string
 *               notification_preferences:
 *                 type: object
 *                 properties:
 *                   sound_type:
 *                     type: string
 *                     enum: [long, short]
 *                   allowed:
 *                     type: boolean
 *     responses:
 *       200:
 *         description: User updated object.
 */
router.post('/updateUser', updateUser);

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
 *               reason:
 *                 type: string
 *                 description: Reason.
 *               sticker_id:
 *                 type: integer
 *                 description: ID of the sticker
 *     responses:
 *       200:
 *         description: Notify user object.
 */
router.post('/notifyUser', notifyUser);

/**
 * @openapi
 * /api/v1/users/searchUser:
 *   post:
 *     summary: Search user
 *     description: Search user by vehicle_number.
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
 *               vehicle_number:
 *                 type: string
 *                 description: vehicle number
 *     responses:
 *       200:
 *         description: User object.
 */
router.post('/searchUser', searchUser);

module.exports = router;
