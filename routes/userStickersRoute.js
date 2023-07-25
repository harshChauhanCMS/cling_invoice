const express = require('express');
const router = express.Router();

// Import controller
const getAllUserStickers = require('../controllers/userStickers/getAllUserStickers');

// Routes
router.get('/getUserStickers', getAllUserStickers);

module.exports = router;
