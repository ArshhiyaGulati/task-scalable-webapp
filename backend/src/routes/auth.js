const express = require('express');
const router = express.Router();
const { register, login, verifyToken } = require('../controllers/authController');
const { validate, registerValidation, loginValidation } = require('../middleware/validation');
const auth = require('../middleware/auth');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', validate(registerValidation), register);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', validate(loginValidation), login);

// @route   GET /api/auth/verify
// @desc    Verify JWT token
// @access  Private
router.get('/verify', auth, verifyToken);

module.exports = router;