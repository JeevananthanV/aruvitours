const express = require('express');
const router = express.Router();
const {
  getPackages,
  getPackage,
  createPackage,
  updatePackage,
  deletePackage
} = require('../controllers/packageController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getPackages)
  .post(protect, createPackage);

router.route('/:id')
  .get(getPackage)
  .put(protect, updatePackage)
  .delete(protect, deletePackage);

module.exports = router;
