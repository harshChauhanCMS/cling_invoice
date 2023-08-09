const express = require('express');
const router = express.Router();

// Import controller
const login = require('../controllers/auth/login');
const verifyToken = require('../controllers/auth/verifyToken');

// Routes

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Login
 *     description: Login.
 *     tags: [Auth]
 *     x-express-openapi-additional-middleware:
 *       - type: body
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone_number:
 *                 type: string
 *                 description: Phone number of the user.
 *               country_code:
 *                 type: string
 *                 description: Country code of the user.
 *     responses:
 *       200:
 *         description: JWT Token
 */
router.post('/login', login);

/**
 * @openapi
 * /api/v1/auth/verifyToken:
 *   post:
 *     summary: Verify Token
 *     description: Verify Token.
 *     tags: [Auth]
 *     x-express-openapi-additional-middleware:
 *       - type: body
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: JWT Token.
 *     responses:
 *       200:
 *         description: JWT Token
 */
router.post('/verifyToken', verifyToken);

module.exports = router;
