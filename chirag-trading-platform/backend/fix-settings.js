const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Settings = require('./models/Settings');
dotenv.config();

async function resetSettings() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected successfully.");
    
    // Delete any broken empty settings
    await Settings.deleteMany({});
    
    // Create correct one
    await Settings.create({
      email: 'yoddhatrader14@gmail.com',
      phone: '+91 98765 43210',
      location: 'Ahmedabad, Gujarat, India'
    });
    
    console.log("Settings hard reset completed.");
    mongoose.disconnect();
  } catch (err) {
    console.error("Error:", err);
  }
}

resetSettings();
