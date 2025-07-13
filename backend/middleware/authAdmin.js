// backend/middleware/authAdmin.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ 
      _id: decoded._id, 
      'tokens.token': token 
    });

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    console.error('Admin auth error:', e);
    res.status(401).json({ error: 'Please authenticate as admin' });
  }
};

module.exports = authAdmin;