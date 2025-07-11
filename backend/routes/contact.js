const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Submit contact form
router.post('/submit', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, service, message } = req.body;
    
    // Validate required fields
    if (!firstName || !email || !phone || !service || !message) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phone,
      service,
      message
    });
    
    await newContact.save();
    
    res.status(201).json({ 
      message: 'Contact form submitted successfully',
      contact: newContact
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;