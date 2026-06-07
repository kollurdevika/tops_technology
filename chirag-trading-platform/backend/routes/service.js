const express = require('express');
const Service = require('../models/Service');
const router = express.Router();

// Get all active services (Public)
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ isActive: true });
    res.json(services.map(s => ({
      id: s._id.toString(),
      title: s.title,
      description: s.description,
      details: s.details,
      icon: s.icon,
      isActive: s.isActive
    })));
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add or Update a service (Admin)
router.post('/', async (req, res) => {
  try {
    const { id, title, description, details, icon, isActive } = req.body;
    
    if (id) {
      // Update
      const updatedService = await Service.findByIdAndUpdate(id, {
        title, description, details, icon, isActive
      }, { new: true });
      return res.json({ message: 'Service updated', service: updatedService });
    } else {
      // Create new
      const newService = await Service.create({
        title, description, details, icon, isActive
      });
      return res.status(201).json({ message: 'Service created', service: newService });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete a service (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Service.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting service', error: err.message });
  }
});

module.exports = router;
