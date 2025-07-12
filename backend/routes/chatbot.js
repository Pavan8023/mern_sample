const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead'); // Create a Lead model

// Capture chatbot leads
router.post('/lead', async (req, res) => {
  try {
    const { name, email, interest, phone } = req.body;
    
    const newLead = new Lead({
      name,
      email,
      interest,
      phone,
      source: 'Website Chatbot',
      date: new Date()
    });

    await newLead.save();
    
    // Optional: Send email notification
    // sendNotificationEmail(newLead);
    
    res.status(201).json({ message: 'Lead captured successfully' });
  } catch (error) {
    console.error('Error saving lead:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;