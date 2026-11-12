const Contact = require('../models/Contact');
const { broadcastInquiry } = require('../utils/realtimeHub');

// @desc    Submit contact message
// @route   POST /api/contacts
// @access  Public
exports.submitContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);

    broadcastInquiry(contact);

    res.status(201).json({
      success: true,
      message: 'Inquiry received successfully! Our team will contact you shortly.',
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
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update contact status
// @route   PUT /api/contacts/:id/status
// @access  Private/Admin
exports.updateContactStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ success: false, error: 'Contact inquiry not found' });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact inquiry
// @route   DELETE /api/contacts/:id
// @access  Private/Admin
exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, error: 'Contact inquiry not found' });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
