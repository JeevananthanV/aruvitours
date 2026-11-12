const express = require('express');
const router = express.Router();
const { getPackages, getPackage, createPackage } = require('../controllers/packageController');

router.route('/')
  .get(getPackages)
  .post(createPackage);

router.route('/:id')
  .get(getPackage);

module.exports = router;
