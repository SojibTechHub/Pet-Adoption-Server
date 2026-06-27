const mongoose = require('mongoose');

const dns = require('dns');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      lookup: dns.lookup,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.log('Server will continue running without MongoDB.');
  }
};

module.exports = connectDB;
