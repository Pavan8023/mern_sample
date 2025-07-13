const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    default: ''
  },
  images: [{
    url: String,
    filename: String
  }]
}, {
  timestamps: true
});

// Add unique index
PageSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model('Page', PageSchema);