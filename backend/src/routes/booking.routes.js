const express = require('express');
const { bookSeat, getBookingDetails } = require('../controllers/booking.controller');
const { authenticateToken } = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/bookings', authenticateToken, bookSeat);
router.get('/bookings/:id', authenticateToken, getBookingDetails);

module.exports = router;
