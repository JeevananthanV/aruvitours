const TourOperation = require('../models/TourOperation');
const Booking = require('../models/Booking');
const {
  broadcastOperationUpdate,
  broadcastPassengerBoarding,
  broadcastMilestone
} = require('../utils/realtimeHub');

// @desc    Get all tour operations
// @route   GET /api/operations
// @access  Public (or Admin)
exports.getOperations = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = {};
    if (status && status !== 'ALL') {
      query.status = status;
    }

    const operations = await TourOperation.find(query)
      .populate('package', 'title destination duration price category')
      .sort({ departureDate: 1 });

    res.status(200).json({
      success: true,
      count: operations.length,
      data: operations
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single tour operation with manifest
// @route   GET /api/operations/:id
// @access  Public/Admin
exports.getOperationById = async (req, res, next) => {
  try {
    const operation = await TourOperation.findById(req.params.id)
      .populate('package')
      .populate('passengers.bookingId');

    if (!operation) {
      return res.status(404).json({
        success: false,
        error: 'Tour operation not found'
      });
    }

    res.status(200).json({
      success: true,
      data: operation
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new tour operation
// @route   POST /api/operations
// @access  Private (Admin)
exports.createOperation = async (req, res, next) => {
  try {
    // Generate operation code if not provided
    if (!req.body.operationCode) {
      const count = await TourOperation.countDocuments();
      req.body.operationCode = `AT-OP-${101 + count}`;
    }

    const operation = await TourOperation.create(req.body);

    broadcastOperationUpdate(operation);

    res.status(201).json({
      success: true,
      data: operation
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update tour operation status and details
// @route   PUT /api/operations/:id
// @access  Private (Admin)
exports.updateOperation = async (req, res, next) => {
  try {
    let operation = await TourOperation.findById(req.params.id);
    if (!operation) {
      return res.status(404).json({
        success: false,
        error: 'Tour operation not found'
      });
    }

    const prevStatus = operation.status;
    operation = await TourOperation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('package');

    // If status changed, auto-record a milestone
    if (req.body.status && req.body.status !== prevStatus) {
      operation.milestones.push({
        timestamp: new Date(),
        title: `Status Changed to ${req.body.status}`,
        location: req.body.currentLocation || operation.currentLocation,
        notes: req.body.statusNotes || `Tour status transitioned from ${prevStatus} to ${req.body.status}`
      });
      await operation.save();
    }

    broadcastOperationUpdate(operation);

    res.status(200).json({
      success: true,
      data: operation
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Post real-time trip milestone / location update
// @route   POST /api/operations/:id/milestones
// @access  Private (Admin)
exports.addMilestone = async (req, res, next) => {
  try {
    const { title, location, notes } = req.body;
    const operation = await TourOperation.findById(req.params.id);

    if (!operation) {
      return res.status(404).json({ success: false, error: 'Tour operation not found' });
    }

    const newMilestone = {
      timestamp: new Date(),
      title: title || 'Operational Update',
      location: location || operation.currentLocation,
      notes: notes || ''
    };

    operation.milestones.push(newMilestone);
    if (location) {
      operation.currentLocation = location;
    }
    await operation.save();

    broadcastMilestone({
      operationId: operation._id,
      operationCode: operation.operationCode,
      milestone: newMilestone
    });

    res.status(200).json({
      success: true,
      data: operation
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update passenger boarding / check-in status
// @route   PUT /api/operations/:id/passengers/:passengerIndex/checkin
// @access  Private (Admin)
exports.updatePassengerCheckIn = async (req, res, next) => {
  try {
    const { id, passengerIndex } = req.params;
    const { boardingStatus } = req.body; // 'BOARDED', 'PENDING', 'NO_SHOW'

    const operation = await TourOperation.findById(id);
    if (!operation) {
      return res.status(404).json({ success: false, error: 'Tour operation not found' });
    }

    const idx = parseInt(passengerIndex, 10);
    if (isNaN(idx) || idx < 0 || idx >= operation.passengers.length) {
      return res.status(400).json({ success: false, error: 'Invalid passenger index' });
    }

    operation.passengers[idx].boardingStatus = boardingStatus;
    operation.passengers[idx].boardedAt = boardingStatus === 'BOARDED' ? new Date() : null;

    await operation.save();

    broadcastPassengerBoarding({
      operationId: operation._id,
      operationCode: operation.operationCode,
      passengerIndex: idx,
      passenger: operation.passengers[idx]
    });

    res.status(200).json({
      success: true,
      data: operation
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Assign confirmed booking to a tour operation
// @route   POST /api/operations/:id/assign-booking
// @access  Private (Admin)
exports.assignBookingToOperation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { bookingId, seatNumbers } = req.body;

    const [operation, booking] = await Promise.all([
      TourOperation.findById(id),
      Booking.findById(bookingId).populate('package')
    ]);

    if (!operation || !booking) {
      return res.status(404).json({ success: false, error: 'Operation or Booking not found' });
    }

    // Add to manifest
    operation.passengers.push({
      bookingId: booking._id,
      bookingRef: booking.bookingRef || `AT-${booking._id.toString().slice(-4).toUpperCase()}`,
      fullName: booking.fullName,
      phone: booking.phone,
      guests: booking.numberOfGuests || 1,
      pickupPoint: booking.pickupPoint || 'Central Point',
      boardingStatus: 'PENDING',
      seatNumbers: seatNumbers || `S-${operation.bookedSeats + 1}`
    });

    operation.bookedSeats += (booking.numberOfGuests || 1);
    await operation.save();

    booking.tourOperation = operation._id;
    booking.status = 'Confirmed';
    await booking.save();

    broadcastOperationUpdate(operation);

    res.status(200).json({
      success: true,
      data: operation
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete tour operation
// @route   DELETE /api/operations/:id
// @access  Private (Admin)
exports.deleteOperation = async (req, res, next) => {
  try {
    const operation = await TourOperation.findByIdAndDelete(req.params.id);
    if (!operation) {
      return res.status(404).json({ success: false, error: 'Tour operation not found' });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

