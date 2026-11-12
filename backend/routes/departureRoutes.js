const express = require('express');
const router = express.Router();
const { getDepartures, createDeparture } = require('../controllers/departureController');

router.route('/')
  .get(getDepartures)
  .post(createDeparture);

module.exports = router;
