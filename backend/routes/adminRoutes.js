const express = require('express');
const router = express.Router();
const { getAdminStats, exportCSV } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

router.get('/stats', protect, getAdminStats);
router.get('/export/:type', protect, exportCSV);

module.exports = router;
