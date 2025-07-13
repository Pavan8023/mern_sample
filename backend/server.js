require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const contentRoutes = require('./routes/content');
const userRoutes = require('./routes/users');

console.log('Environment Variables:');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not set!');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'Not set!');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://bydefault05.netlify.app',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/users', userRoutes);

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
    
    // Initialize database after connection
    await initializeDatabase();
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

// Database initialization
const initializeDatabase = async () => {
  const Page = require('./models/Page');
  const User = require('./models/User');
  const bcrypt = require('bcryptjs');

  // Create initial pages with upsert
  const pages = ['home', 'services', 'programs', 'events', 'gallery', 'about', 'contact'];
  for (const pageName of pages) {
    try {
      const result = await Page.updateOne(
        { name: pageName },
        {
          $setOnInsert: {
            content: `<h1>Welcome to ${pageName.charAt(0).toUpperCase() + pageName.slice(1)} Page</h1>`
          }
        },
        { upsert: true }
      );
      
      if (result.upsertedCount > 0) {
        console.log(`Created initial page: ${pageName}`);
      } else {
        console.log(`Page ${pageName} already exists`);
      }
    } catch (pageError) {
      console.error(`Error ensuring page ${pageName}:`, pageError);
    }
  }

  // Create admin user with explicit username
  const adminEmail = 'admin@example.com';
  try {
    const hashedPassword = await bcrypt.hash('admin@123', 10);
    
    // Use findOneAndUpdate instead of updateOne to trigger hooks
    const result = await User.findOneAndUpdate(
      { email: adminEmail },
      {
        $setOnInsert: {
          name: 'Admin User',
          email: adminEmail,
          username: 'admin', // Set explicit username
          password: hashedPassword,
          role: 'admin'
        }
      },
      { 
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      }
    );
    
    if (result.isNew) {
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }
  } catch (adminError) {
    console.error('Error ensuring admin user:', adminError);
  }
};

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 10000;

// Start the server after connecting to database
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});