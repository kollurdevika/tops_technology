const mongoose = require('mongoose');

const socialLinkSchema = new mongoose.Schema({
  platform: { type: String, required: true }, // e.g., Instagram, YouTube, Telegram
  url: { type: String, required: true },
  username: { type: String },
  followers: { type: String }, // e.g., "10K"
  icon: { type: String }, // optional icon class or name
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('SocialLink', socialLinkSchema);
