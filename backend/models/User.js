const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    // Remove the problematic default function
    default: 'user' + Math.floor(Math.random() * 10000)
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add pre-save hook to generate username if not provided
userSchema.pre('save', function(next) {
  if (!this.username || this.username.startsWith('user')) {
    if (this.email) {
      this.username = this.email.split('@')[0] + Math.floor(Math.random() * 1000);
    } else {
      this.username = 'user' + Math.floor(Math.random() * 10000);
    }
  }
  next();
});

module.exports = mongoose.model('User', userSchema);