const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Validate JWT_SECRET exists
if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined.');
  throw new Error('JWT_SECRET missing');
}

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const userData = {
      _id: user._id,
      name: user.name,
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

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    let user = await User.findOne({ email: normalizedEmail });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    user = new User({
      name,
      email: normalizedEmail,
      password: hashedPassword
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const userData = {
      _id: user._id,
      name: user.name,
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
    res.status(500).json({ 
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;