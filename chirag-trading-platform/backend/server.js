const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
dotenv.config();

// Route imports
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');
const socialRoutes = require('./routes/social');
const serviceRoutes = require('./routes/service');
const settingsRoutes = require('./routes/settings');
const adminContactRoutes = require('./routes/adminContact');

const PORT = process.env.PORT || 5000;
// Clean duplicate imports removed

const app = express();
// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/adminContact', adminContactRoutes);
app.get('/', (req, res) => {
  res.send('Chirag Trading Backend API is running...');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected successfully (Atlas)');
  // Start server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
