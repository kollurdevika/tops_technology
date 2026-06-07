const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  phone: { type: String, default: '+91 98765 43210' },
  email: { type: String, default: 'contact@chiragadaki.com' },
  location: { type: String, default: 'Mumbai, Maharashtra, India' }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
