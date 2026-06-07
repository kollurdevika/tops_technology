const express = require('express');
const router = express.Router();
const SocialLink = require('../models/SocialLink');

// Get all social links (Public)
router.get('/', async (req, res) => {
  try {
    const links = await SocialLink.find();
    res.json(links.map(s => ({
      id: s._id.toString(),
      platform: s.platform,
      url: s.url,
      username: s.username,
      followers: s.followers,
      icon: s.icon,
      isActive: s.isActive
    })));
  } catch (err) {
    res.status(500).json({ message: 'Error fetching social links', error: err.message });
  }
});

// Add or Update a social link (Admin)
router.post('/', async (req, res) => {
  try {
    const { id, platform, url, username, followers, icon, isActive } = req.body;
    
    if (id) {
      // Update
      const updatedLink = await SocialLink.findByIdAndUpdate(id, {
        platform, url, username, followers, icon, isActive
      }, { new: true });
      return res.json({ message: 'Social link updated', link: updatedLink });
    } else {
      // Create new
      const newLink = await SocialLink.create({
        platform, url, username, followers, icon, isActive
      });
      return res.status(201).json({ message: 'Social link created', link: newLink });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error saving social link', error: err.message });
  }
});

// Delete a social link (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await SocialLink.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Social link not found' });
    }
    res.json({ message: 'Social link deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting social link', error: err.message });
  }
});

module.exports = router;
