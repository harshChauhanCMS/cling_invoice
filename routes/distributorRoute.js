const express = require('express');
const router = express.Router();

// Import controller
const addDistributor = require('../controllers/distributors/addDistributor');
const getAllDistributors = require('../controllers/distributors/getAllDistributors');

// Routes
router.post('/addDistributor', addDistributor);
router.get('/getAllDistributors', getAllDistributors);

module.exports = router;
