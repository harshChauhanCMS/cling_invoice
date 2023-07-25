const express = require('express');
const router = express.Router();

// Import controller
const getAllUserStickers = require('../controllers/userStickers/getAllUserStickers');
const addUserSticker = require('../controllers/userStickers/addUserSticker');
const updateUserSticker = require('../controllers/userStickers/updateUserSticker');

// Routes
router.get('/getUserStickers', getAllUserStickers);
router.post('/addUserSticker', addUserSticker);
router.patch('/updateUserSticker', updateUserSticker);

module.exports = router;
