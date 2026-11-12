const Package = require('../models/Package');

// @desc    Get all packages
// @route   GET /api/packages
// @access  Public
exports.getPackages = async (req, res, next) => {
  try {
    const packages = await Package.find();
    res.status(200).json({
      success: true,
      count: packages.length,
      data: packages
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single package by slug or ID
// @route   GET /api/packages/:id
// @access  Public
exports.getPackage = async (req, res, next) => {
  try {
    const packageItem = await Package.findById(req.params.id);
    if (!packageItem) {
      return res.status(404).json({
        success: false,
        error: 'Package not found'
      });
    }
    res.status(200).json({
      success: true,
      data: packageItem
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a package
// @route   POST /api/packages
// @access  Private/Admin (Placeholder)
exports.createPackage = async (req, res, next) => {
  try {
    const packageItem = await Package.create(req.body);
    res.status(201).json({
      success: true,
      data: packageItem
    });
  } catch (error) {
    next(error);
  }
};
