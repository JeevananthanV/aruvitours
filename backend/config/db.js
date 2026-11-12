const mongoose = require('mongoose');
const seedPackages = require('../utils/seeder');
const User = require('../models/User');

const seedAdminUser = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const username = process.env.ADMIN_USERNAME || 'admin';
      const email = 'admin@aruvitours.com';
      const password = process.env.ADMIN_PASSWORD || 'admin123';
      
      await User.create({
        username,
        email,
        password
      });
      console.log(`Default admin user created! Username: ${username}, Password: ${password}`);
    }
  } catch (error) {
    console.error('Error seeding admin user:', error.message);
  }
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aruvi-tours');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Seed packages automatically if needed
    await seedPackages();
    
    // Seed admin user automatically if needed
    await seedAdminUser();
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

