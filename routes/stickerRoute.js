const express = require('express');
const router = express.Router();

// Import controller
const addSticker = require('../controllers/stickers/addSticker');

// Routes
router.post('/addSticker', addSticker);

module.exports = router;
