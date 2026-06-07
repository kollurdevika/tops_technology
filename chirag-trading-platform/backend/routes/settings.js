const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const DATA_FILE = path.join(__dirname, '../settings.json');

const getSettings = () => {
  try {
    if (fs.existsSync(DATA_FILE)) return JSON.parse(fs.readFileSync(DATA_FILE));
  } catch (err) {}
  return { phone: '+91 9725749624', email: 'adakichirag001@gmail.com', location: 'Ahmedabad, Gujarat, India' };
};

// Get settings (Public)
router.get('/', (req, res) => {
  res.json(getSettings());
});

// Update settings (Admin)
router.post('/', (req, res) => {
  const { phone, email, location } = req.body;
  const newSettings = { phone, email, location };
  fs.writeFileSync(DATA_FILE, JSON.stringify(newSettings, null, 2));
  res.status(200).json(newSettings);
});

module.exports = router;
