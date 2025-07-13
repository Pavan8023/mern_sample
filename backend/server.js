require('dotenv').config();

console.log('Environment Variables:');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not set!');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'Not set!');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://bydefault05.netlify.app',  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

connectDB();

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected to database:', mongoose.connection.db.databaseName);
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Authentication Backend is running');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    dbState: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    jwtSecret: process.env.JWT_SECRET ? 'set' : 'missing'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});