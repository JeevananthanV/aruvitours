const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
    required: [true, 'Please select a package']
  },
  fullName: {
    type: String,
    required: [true, 'Please add your full name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add your email address'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Please add your phone number']
  },
  travelDate: {
    type: Date,
    required: [true, 'Please select a travel date']
  },
  numberOfGuests: {
    type: Number,
    required: [true, 'Please specify the number of guests'],
    min: [1, 'Number of guests must be at least 1']
  },
  specialRequests: {
    type: String,
    trim: true
  },
  bookingRef: {
    type: String,
    trim: true,
    uppercase: true
  },
  pickupPoint: {
    type: String,
    default: 'Chennai Central / Koyambedu'
  },
  paymentStatus: {
    type: String,
    enum: ['Unpaid', 'Advance Paid', 'Fully Paid'],
    default: 'Advance Paid'
  },
  tourOperation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TourOperation'
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
