const express = require('express');
const router = express.Router();

// Import controller
const addSticker = require('../controllers/stickers/addSticker');
const massUpload = require('../controllers/stickers/massUpload');
const massUpdate = require('../controllers/stickers/massUpdate');

// Routes
router.post('/addSticker', addSticker);
router.post('/massUpload', massUpload);
router.patch('/massUpdate', massUpdate);

module.exports = router;
