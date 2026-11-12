const Package = require('../models/Package');

// @desc    Get all packages
// @route   GET /api/packages
// @access  Public
exports.getPackages = async (req, res, next) => {
  try {
    const { category, featured } = req.query;
    const query = {};
    if (category) query.category = category;
    if (featured !== undefined) query.featured = featured === 'true';

    const packages = await Package.find(query).sort({ createdAt: -1 });
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
    let packageItem;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      packageItem = await Package.findById(req.params.id);
    } else {
      packageItem = await Package.findOne({ slug: req.params.id });
    }

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
// @access  Private/Admin
exports.createPackage = async (req, res, next) => {
  try {
    if (!req.body.slug && req.body.title) {
      req.body.slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    const packageItem = await Package.create(req.body);
    res.status(201).json({
      success: true,
      data: packageItem
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a package
// @route   PUT /api/packages/:id
// @access  Private/Admin
exports.updatePackage = async (req, res, next) => {
  try {
    const packageItem = await Package.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!packageItem) {
      return res.status(404).json({ success: false, error: 'Package not found' });
    }

    res.status(200).json({
      success: true,
      data: packageItem
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a package
// @route   DELETE /api/packages/:id
// @access  Private/Admin
exports.deletePackage = async (req, res, next) => {
  try {
    const packageItem = await Package.findByIdAndDelete(req.params.id);
    if (!packageItem) {
      return res.status(404).json({ success: false, error: 'Package not found' });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
