const express = require('express');
const router = express.Router();

// Import controller
const getAllUserStickers = require('../controllers/userStickers/getAllUserStickers');
const addUserSticker = require('../controllers/userStickers/addUserSticker');
const updateUserSticker = require('../controllers/userStickers/updateUserSticker');
const deleteUserSticker = require('../controllers/userStickers/deleteUserSticker');
const getUserStickersDetails = require('../controllers/userStickers/getUserStickersDetails');

// Routes

/**
 * @openapi
 * /api/v1/userStickers/getUserStickers:
 *   get:
 *     summary: Get All User Stickers
 *     description: Retrieve all user stickers.
 *     tags: [User Stickers]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *         description: ID of the user.
 *         required: true
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Status of the stickers.
 *     responses:
 *       200:
 *         description: All User Stickers Object
 */
router.get('/getUserStickers', getAllUserStickers);

/**
 * @openapi
 * /api/v1/userStickers/addUserSticker:
 *   post:
 *     summary: Add User Sticker
 *     description: Add a user sticker.
 *     tags: [User Stickers]
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
 *                 type: number
 *                 description: ID of the sticker.
 *               vehicle_number:
 *                 type: string
 *               vehicle_make:
 *                 type: string
 *               vehicle_name:
 *                 type: string
 *     responses:
 *       200:
 *         description: User Sticker Object
 */
router.post('/addUserSticker', addUserSticker);

/**
 * @openapi
 * /api/v1/userStickers/updateUserSticker:
 *   post:
 *     summary: Update User Sticker
 *     description: Update a user sticker.
 *     tags: [User Stickers]
 *     x-express-openapi-additional-middleware:
 *       - type: body
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: ID of the user sticker.
 *               vehicle_make:
 *                 type: string
 *                 description: Vehicle make.
 *               vehicle_name:
 *                 type: string
 *                 description: Vehicle name.
 *               vehicle_number:
 *                 type: string
 *                 description: Vehicle number.
 *     responses:
 *       '200':
 *         description: User Sticker Object
 */
router.post('/updateUserSticker', updateUserSticker);

/**
 * @openapi
 * /api/v1/userStickers/deleteUserSticker:
 *   delete:
 *     summary: Delete User Sticker
 *     description: Delete a user sticker.
 *     tags: [User Stickers]
 *     x-express-openapi-additional-middleware:
 *       - type: body
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: ID of the user sticker.
 *     responses:
 *       '200':
 *         description: Deleted User Sticker Object
 */
router.delete('/deleteUserSticker', deleteUserSticker);

/**
 * @openapi
 * /api/v1/userStickers/getUserStickersDetails:
 *   get:
 *     summary: Get User Sticker Details
 *     description: Get user sticker details.
 *     tags: [User Stickers]
 *     x-express-openapi-additional-middleware:
 *       - type: body
 *     responses:
 *       '200':
 *         description: User Sticker Object
 */
router.get('/getUserStickersDetails', getUserStickersDetails);

module.exports = router;
