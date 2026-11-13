const mongoose = require('mongoose');

const tourOperationSchema = new mongoose.Schema({
  operationCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package'
  },
  packageName: {
    type: String,
    required: true,
    trim: true
  },
  destination: {
    type: String,
    required: true
  },
  departureDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date,
    required: true
  },
  tourManager: {
    name: { type: String, default: 'Muruganandam S' },
    phone: { type: String, default: '+91 94432 10987' }
  },
  driverDetails: {
    driverName: { type: String, default: 'Selvakumar R' },
    driverPhone: { type: String, default: '+91 98421 54321' },
    vehicleType: { type: String, default: 'Luxury AC Tempo Traveller (17 Seater)' },
    vehicleNumber: { type: String, default: 'TN-30-BC-8921' }
  },
  status: {
    type: String,
    enum: ['SCHEDULED', 'BOARDING_ACTIVE', 'EN_ROUTE', 'SITE_VISIT', 'RETURN_JOURNEY', 'COMPLETED', 'DELAYED'],
    default: 'SCHEDULED'
  },
  currentLocation: {
    type: String,
    default: 'Depot - Inspection & Fueling'
  },
  totalSeats: {
    type: Number,
    default: 16
  },
  bookedSeats: {
    type: Number,
    default: 0
  },
  boardingPoints: [{
    city: String,
    location: String,
    time: String
  }],
  milestones: [{
    timestamp: { type: Date, default: Date.now },
    title: String,
    location: String,
    notes: String
  }],
  passengers: [{
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
    bookingRef: String,
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    guests: { type: Number, default: 1 },
    pickupPoint: { type: String, default: 'Main Office' },
    boardingStatus: {
      type: String,
      enum: ['PENDING', 'BOARDED', 'NO_SHOW'],
      default: 'PENDING'
    },
    boardedAt: Date,
    seatNumbers: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('TourOperation', tourOperationSchema);

