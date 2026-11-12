const express = require('express');
const router = express.Router();
const {
  submitContact,
  getContacts,
  updateContactStatus,
  deleteContact
} = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getContacts)
  .post(submitContact);

router.route('/:id/status')
  .put(protect, updateContactStatus);

router.route('/:id')
  .delete(protect, deleteContact);

module.exports = router;
