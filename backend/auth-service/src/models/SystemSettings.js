const mongoose = require('mongoose');

const SystemSettingsSchema = new mongoose.Schema({
  maintenanceMode: {
    type: Boolean,
    default: false
  },
  allowRegistration: {
    type: Boolean,
    default: true
  },
  defaultUserRole: {
    type: String,
    enum: ['participant', 'organizer', 'admin'],
    default: 'participant'
  },
  emailNotifications: {
    type: Boolean,
    default: true
  },
  pushNotifications: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SystemSettings', SystemSettingsSchema);
