const express = require('express');
const router = express.Router();
const { submitContact, getContacts } = require('../controllers/contactController');

router.route('/')
  .get(getContacts)
  .post(submitContact);

module.exports = router;
