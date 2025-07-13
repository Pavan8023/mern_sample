// backend/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authAdmin = require('../middleware/authAdmin');

// Get all users
router.get('/', authAdmin, async (req, res) => {
  try {
    // Fetch users without password field, sorted by creation date
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a user
router.delete('/:id', authAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;