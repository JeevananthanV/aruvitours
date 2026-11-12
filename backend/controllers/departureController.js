const FixedDeparture = require('../models/FixedDeparture');

// @desc    Get fixed departures
// @route   GET /api/departures
// @access  Public
exports.getDepartures = async (req, res, next) => {
  try {
    const departures = await FixedDeparture.find().populate('package');
    res.status(200).json({
      success: true,
      count: departures.length,
      data: departures
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a fixed departure
// @route   POST /api/departures
// @access  Private/Admin
exports.createDeparture = async (req, res, next) => {
  try {
    const departure = await FixedDeparture.create(req.body);
    res.status(201).json({
      success: true,
      data: departure
    });
  } catch (error) {
    next(error);
  }
};
