const express = require('express');
const router = express.Router();

// Import controller
const addRequest = require('../controllers/request/addRequest');
const getAllRequest = require('../controllers/request/getAllRequest');

// Routes

/**
 * @openapi
 * /api/v1/request/addRequest:
 *   post:
 *     summary: Add a new request
 *     description: Add a new request
 *     tags: [Request]
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
 *                 description: Phone number of the user
 *               is_contacted:
 *                 type: boolean
 *                 required: false
 *                 description: Is contacted or not
 *               remarks:
 *                 type: string
 *                 description: Remarks
 *     responses:
 *       200:
 *         description: New request object.
 */
router.post('/addRequest', addRequest);

/**
 * @openapi
 * /api/v1/request/getAllRequest:
 *   get:
 *     summary: Get all requests
 *     description: Retrieve all requests with optional pagination.
 *     tags: [Request]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: The page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: The number of items per page.
 *     responses:
 *       200:
 *         description: All Request Objects
 */
router.get('/getAllRequest', getAllRequest);

module.exports = router;
