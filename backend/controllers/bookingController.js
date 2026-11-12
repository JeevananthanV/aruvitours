const Booking = require('../models/Booking');
const Package = require('../models/Package');
const { broadcastBooking, broadcastBookingStatus } = require('../utils/realtimeHub');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
exports.createBooking = async (req, res, next) => {
  try {
    const { packageSlug, packageId, ...bookingData } = req.body;
    
    let resolvedPackageId = packageId;
    
    if (!resolvedPackageId && packageSlug) {
      const pkg = await Package.findOne({ slug: packageSlug.toLowerCase() });
      if (pkg) {
        resolvedPackageId = pkg._id;
      }
    }

    if (!resolvedPackageId) {
      return res.status(400).json({
        success: false,
        error: 'Please select a valid package'
      });
    }

    const bookingRef = `AT-2027-${Math.floor(1000 + Math.random() * 9000)}`;

    const booking = await Booking.create({
      package: resolvedPackageId,
      bookingRef,
      ...bookingData
    });

    const populatedBooking = await Booking.findById(booking._id).populate('package');

    // Real-time broadcast
    broadcastBooking(populatedBooking);

    res.status(201).json({
      success: true,
      message: 'Booking request confirmed successfully!',
      data: populatedBooking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
exports.getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().populate('package').sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
exports.updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!['Pending', 'Confirmed', 'Cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid status (Pending, Confirmed, Cancelled)'
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('package');

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    // Real-time broadcast
    broadcastBookingStatus(booking);

    res.status(200).json({
      success: true,
      message: `Booking status updated to ${status}`,
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

