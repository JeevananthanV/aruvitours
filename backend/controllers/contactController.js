const Contact = require('../models/Contact');

// @desc    Submit contact message
// @route   POST /api/contacts
// @access  Public
exports.submitContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({
      success: true,
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact submissions
// @route   GET /api/contacts
// @access  Private/Admin
exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    next(error);
  }
};
