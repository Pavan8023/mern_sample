const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Validate JWT_SECRET exists
if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined.');
  process.exit(1);
}

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    // Check if user exists by email or username
    const existingUser = await User.findOne({ 
      $or: [
        { email: normalizedEmail },
        { username }
      ]
    });
    
    if (existingUser) {
      if (existingUser.email === normalizedEmail) {
        return res.status(409).json({ message: 'Email already exists' });
      }
      if (existingUser.username === username) {
        return res.status(409).json({ message: 'Username already taken' });
      }
    }

    // Create user with hashed password
    const user = new User({
      username,
      email: normalizedEmail,
      password // Will be hashed by pre-save hook
    });

    // Save user to database
    await user.save();

    // Create token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return user without password
    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt
    };

    res.status(201).json({
      token,
      user: userData,
      message: 'User created successfully'
    });

  } catch (error) {
    console.error('Signup error:', error);
    
    let errorMessage = 'Server error';
    if (error.name === 'ValidationError') {
      errorMessage = Object.values(error.errors).map(val => val.message).join(', ');
    } else if (error.code === 11000) {
      errorMessage = 'Duplicate field value entered';
    }
    
    res.status(500).json({ 
      message: errorMessage,
      error: error.message
    });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    const normalizedEmail = email.toLowerCase().trim();

    // Find user by email
    const user = await User.findOne({ email: normalizedEmail }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Prepare user data without password
    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt
    };

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

module.exports = router;