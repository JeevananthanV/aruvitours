const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a package title'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  destination: {
    type: String,
    required: [true, 'Please add a destination']
  },
  duration: {
    type: String,
    required: [true, 'Please add duration (e.g., 5 Days / 4 Nights)']
  },
  price: {
    type: Number,
    required: [true, 'Please add a package price']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  images: [{
    type: String
  }],
  category: {
    type: String,
    enum: ['Domestic', 'International', 'HNI Luxury', 'Fixed Departure'],
    required: true
  },
  inclusions: [{
    type: String
  }],
  exclusions: [{
    type: String
  }],
  itinerary: [{
    day: Number,
    title: String,
    description: String
  }],
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Package', packageSchema);
