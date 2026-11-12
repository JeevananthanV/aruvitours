const express = require('express');
const router = express.Router();
const {
  getOperations,
  getOperationById,
  createOperation,
  updateOperation,
  addMilestone,
  updatePassengerCheckIn,
  assignBookingToOperation,
  deleteOperation
} = require('../controllers/operationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getOperations)
  .post(protect, createOperation);

router.route('/:id')
  .get(getOperationById)
  .put(protect, updateOperation)
  .delete(protect, deleteOperation);

router.post('/:id/milestones', protect, addMilestone);
router.put('/:id/passengers/:passengerIndex/checkin', protect, updatePassengerCheckIn);
router.post('/:id/assign-booking', protect, assignBookingToOperation);

module.exports = router;
