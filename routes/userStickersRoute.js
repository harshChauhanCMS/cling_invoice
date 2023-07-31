const express = require('express');
const router = express.Router();

// Import controller
const getAllUserStickers = require('../controllers/userStickers/getAllUserStickers');
const addUserSticker = require('../controllers/userStickers/addUserSticker');
const updateUserSticker = require('../controllers/userStickers/updateUserSticker');

// Routes

/**
 * @openapi
 * /api/v1/userStickers/getUserStickers:
 *   post:
 *     summary: Get All User Stickers
 *     description: Retrieve all user stickers.
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
 *     responses:
 *       200:
 *         description: All User Stickers Object
 */
router.post('/getUserStickers', getAllUserStickers);

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
 *                type: string
 *                description: ID of the sticker.
 *     responses:
 *       200:
 *         description: User Sticker Object
 */
router.post('/addUserSticker', addUserSticker);

/**
 * @openapi
 * /api/v1/userStickers/updateUserSticker:
 *   patch:
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
router.patch('/updateUserSticker', updateUserSticker);

module.exports = router;
