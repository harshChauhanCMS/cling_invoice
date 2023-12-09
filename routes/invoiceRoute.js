const express = require('express');
const router = express.Router();

// Import controller
const invoiceRoute = require('../controllers/invoice/invoice');

// Routes
router.post('/', invoiceRoute);

module.exports = router;
