const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: String,
  interest: {
    type: String,
    required: true
  },
  source: {
    type: String,
    default: 'Website'
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'New',
    enum: ['New', 'Contacted', 'Converted', 'Closed']
  }
});

module.exports = mongoose.model('Lead', leadSchema);