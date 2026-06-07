const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');

// Get current admin contact details
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    // Return with address mapped to location for backward compatibility
    res.json({
      email: settings.email,
      phone: settings.phone,
      address: settings.location // map location to address
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching admin contact', error: err.message });
  }
});

// Update admin contact details
router.put('/', async (req, res) => {
  try {
    const { email, phone, address } = req.body;
    
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }
    
    settings.email = email ?? settings.email;
    settings.phone = phone ?? settings.phone;
    settings.location = address ?? settings.location; // map address to location
    
    await settings.save();
    
    res.json({
      email: settings.email,
      phone: settings.phone,
      address: settings.location
    });
  } catch (err) {
    res.status(500).json({ message: 'Error saving admin contact', error: err.message });
  }
});

module.exports = router;
