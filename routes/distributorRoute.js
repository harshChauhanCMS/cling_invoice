const express = require('express');
const router = express.Router();

// Import controller
const addDistributor = require('../controllers/distributors/addDistributor');
const getAllDistributors = require('../controllers/distributors/getAllDistributors');

// Routes

/**
 * @openapi
 * /api/v1/distributors/addDistributor:
 *   post:
 *     summary: Add distributor
 *     description: Add a new distributor.
 *     tags: [Distributors]
 *     x-express-openapi-additional-middleware:
 *       - type: body
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the distributor.
 *               phone_number:
 *                 type: string
 *                 description: Phone number of the distributor.
 *               address:
 *                 type: string
 *                 description: Address of the distributor.
 *               location:
 *                 type: object
 *                 properties:
 *                   latitude:
 *                     type: number
 *                     description: Latitude of the distributor.
 *                   longitude:
 *                     type: number
 *                     description: Longitude of the distributor.
 *     responses:
 *       200:
 *         description: New distributor
 */
router.post('/addDistributor', addDistributor);

/**
 * @openapi
 * /api/v1/distributors/getAllDistributors:
 *   get:
 *     summary: Get all distributors
 *     description: Retrieve all distributors.
 *     tags: [Distributors]
 *     headers: []
 *     responses:
 *       200:
 *         description: All distributors
 */
router.get('/getAllDistributors', getAllDistributors);

module.exports = router;
