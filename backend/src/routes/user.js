const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getStats } = require('../controllers/userController');
const { validate, updateProfileValidation } = require('../middleware/validation');
const auth = require('../middleware/auth');

// All routes are protected
router.use(auth);

// @route   GET /api/user/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', getProfile);

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', validate(updateProfileValidation), updateProfile);

// @route   GET /api/user/stats
// @desc    Get user statistics
// @access  Private
router.get('/stats', getStats);

module.exports = router;