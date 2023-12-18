const express = require('express');
const router = express.Router();

// Import controller
const getInvoice = require('../controllers/invoice/getInvoice');
const invoiceRoute = require('../controllers/invoice/invoice');
const getSingleInvoice = require('../controllers/invoice/getSingleInvoice');
const addInvoice = require('../controllers/invoice/addInvoice');

// Routes
router.get('/:id', getSingleInvoice);
router.get('/', getInvoice);
router.post('/', invoiceRoute);
router.post('/addInvoice', addInvoice);

module.exports = router;
