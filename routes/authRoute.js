const express = require('express');
const router = express.Router();

// Import controller
const login = require('../controllers/auth/login');
const verifyToken = require('../controllers/auth/verifyToken');

// Routes
router.post('/login', login);
router.post('/verifyToken', verifyToken);

module.exports = router;
