// backend/routes/content.js
const express = require('express');
const router = express.Router();
const Page = require('../models/Page');
const authAdmin = require('../middleware/authAdmin');
const upload = require('../utils/upload');
const fs = require('fs');
const path = require('path');

// Get page content
router.get('/:name', async (req, res) => {
  try {
    const page = await Page.findOne({ name: req.params.name });
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.json(page);
  } catch (err) {
    console.error('Error fetching page:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update page content
router.put('/:name', authAdmin, upload.array('images'), async (req, res) => {
  try {
    const page = await Page.findOne({ name: req.params.name });
    
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    
    // Update text content
    if (req.body.content) {
      page.content = req.body.content;
    }
    
    // Handle new images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => ({
        url: `/uploads/${file.filename}`,
        filename: file.filename
      }));
      page.images = [...page.images, ...newImages];
    }
    
    // Handle removed images
    if (req.body.removedImages) {
      const removedFilenames = JSON.parse(req.body.removedImages);
      
      // Delete files from server
      removedFilenames.forEach(filename => {
        const filePath = path.join(__dirname, '../uploads', filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
      
      page.images = page.images.filter(img => !removedFilenames.includes(img.filename));
    }
    
    const updatedPage = await page.save();
    res.json(updatedPage);
  } catch (err) {
    console.error('Error updating page:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;