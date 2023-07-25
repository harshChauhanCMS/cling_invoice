const express = require('express');
const router = express.Router();

// Import controller
const addDistributor = require('../controllers/distributors/addDistributor');

// Routes
router.post('/addDistributor', addDistributor);

module.exports = router;
