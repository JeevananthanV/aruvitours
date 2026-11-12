const express = require('express');
const router = express.Router();
const { createBooking, getBookings, updateBookingStatus } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getBookings)
  .post(createBooking);

router.route('/:id/status')
  .put(protect, updateBookingStatus);

module.exports = router;
