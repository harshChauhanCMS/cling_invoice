const express = require('express');
const router = express.Router();

// Import controller
const login = require('../controllers/user/login');

// Routes
router.post('/login', login);

module.exports = router;
