const mongoose = require('mongoose');

const fixedDepartureSchema = new mongoose.Schema({
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
    required: [true, 'Please link this departure to a package']
  },
  departureDate: {
    type: Date,
    required: [true, 'Please add departure date']
  },
  returnDate: {
    type: Date,
    required: [true, 'Please add return date']
  },
  availableSeats: {
    type: Number,
    required: [true, 'Please specify available seats'],
    min: [0, 'Available seats cannot be negative']
  },
  totalSeats: {
    type: Number,
    required: [true, 'Please specify total seats']
  },
  status: {
    type: String,
    enum: ['Upcoming', 'Sold Out', 'Completed', 'Cancelled'],
    default: 'Upcoming'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('FixedDeparture', fixedDepartureSchema);
