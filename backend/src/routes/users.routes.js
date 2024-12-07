const express = require('express');
const { getUserDetails, updateUser } = require('../controllers/user.controller');
const { authenticateToken } = require('../middleware/auth.middleware');
const router = express.Router();

// Route to get details of the currently logged-in user
router.get('/users/me', authenticateToken, getUserDetails);

// Route to update user details (e.g., username or password)
router.put('/users/me', authenticateToken, updateUser);

module.exports = router;
