const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

let nodemailer;
try {
  nodemailer = require('nodemailer');
} catch (err) {
  console.log("NOTE: 'nodemailer' is not installed. Email notifications are disabled until you run 'npm install nodemailer'.");
}

// Get all contacts (Admin)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts.map(c => ({
      id: c._id.toString(),
      name: c.name,
      email: c.email,
      phone: c.phone,
      message: c.message,
      createdAt: c.createdAt
    })));
  } catch (err) {
    res.status(500).json({ message: 'Error fetching contacts', error: err.message });
  }
});

// Submit contact form (Public)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const newContact = await Contact.create({ name, email, phone, message });

    // Send Email Notification
    if (nodemailer) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_EMAIL_PASSWORD
          }
        });

        const mailOptions = {
          from: 'YOUR_EMAIL@gmail.com',
          to: 'YOUR_EMAIL@gmail.com', // Should ideally be process.env.ADMIN_EMAIL
          subject: `New Trading Lead: ${name}`,
          text: `You have a new contact form submission!\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
        };

        await transporter.sendMail(mailOptions);
        console.log("Email notification sent successfully to admin!");
      } catch (emailErr) {
        console.error("Failed to send email notification:", emailErr.message);
      }
    }

    res.status(201).json({ message: 'Contact submitted successfully', contact: newContact });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit contact', error: err.message });
  }
});

// Delete a contact (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting contact', error: err.message });
  }
});

// Reply to a contact via email (Admin)
router.post('/:id/reply', async (req, res) => {
  try {
    const { id } = req.params;
    const { replyMessage } = req.body;
    
    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    if (nodemailer) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_EMAIL_PASSWORD
          }
        });
        const mailOptions = {
          from: process.env.ADMIN_EMAIL,
          to: contact.email,
          subject: `Re: Your Message to Yoddha Trader`,
          text: replyMessage
        };
        await transporter.sendMail(mailOptions);
        console.log('Reply email sent to', contact.email);
        
        // Optionally update status to responded
        contact.status = 'responded';
        await contact.save();

      } catch (e) {
        console.error('Failed to send reply email', e.message);
      }
    }
    res.json({ message: 'Reply sent (if email configured)' });
  } catch (err) {
    res.status(500).json({ message: 'Error replying to contact', error: err.message });
  }
});

module.exports = router;
