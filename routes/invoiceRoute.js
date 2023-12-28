const express = require('express');
const router = express.Router();

// Import controller
const getInvoice = require('../controllers/invoice/getInvoice');
const invoiceRoute = require('../controllers/invoice/invoice');
const getSingleInvoice = require('../controllers/invoice/getSingleInvoice');
const addInvoice = require('../controllers/invoice/addInvoice');
const deleteInvoice = require('../controllers/invoice/deleteInvoice');
const getSentInvoices = require('../controllers/invoice/getSentInvoices');

// Routes
router.post('/addInvoice', addInvoice);
router.post('/:id', invoiceRoute);
router.get('/:id', getSingleInvoice);
router.delete('/:id', deleteInvoice);
router.get('/', getInvoice);
router.get('/getSentInvoices/:id', getSentInvoices);

module.exports = router;
