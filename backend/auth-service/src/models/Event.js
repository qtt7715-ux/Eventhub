const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    default: '10:00 AM'
  },
  venue: {
    type: String,
    default: 'DTU Campus'
  },
  location: String,
  organizer: String,
  category: {
    type: String,
    default: 'General'
  },
  registrationOpen: {
    type: Boolean,
    default: true
  },
  maxParticipants: {
    type: Number,
    default: 100
  },
  capacity: Number,
  registeredCount: {
    type: Number,
    default: 0
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  image: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
