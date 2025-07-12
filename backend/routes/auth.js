const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Login route with enhanced error handling
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Normalize email to lowercase
    const normalizedEmail = email.toLowerCase().trim();

    // 2. Find user by normalized email
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      console.log(`Login attempt for non-existent email: ${normalizedEmail}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 3. Compare passwords with bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`Password mismatch for user: ${user.email}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 4. Create JWT token with extended expiration
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' } // Extended expiration
    );

    // 5. Return user data without password
    const userData = user.toObject();
    delete userData.password;

    res.status(200).json({ 
      token, 
      user: userData,
      message: 'Login successful'
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message
    });
  }
});

// Signup route for completeness
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    // Check if user exists
    let user = await User.findOne({ email: normalizedEmail });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user with hashed password
    user = new User({
      name,
      email: normalizedEmail,
      password
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Create token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return user without password
    const userData = user.toObject();
    delete userData.password;

    res.status(201).json({
      token,
      user: userData,
      message: 'User created successfully'
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;