// createAdmin.ts
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Admin from './models/Admin.js'; // Adjust path based on your project

dotenv.config(); // Load DB connection string from .env

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    // No additional code needed here to run createAdmin.
    // Just ensure you run this file with Node.js:
    // node create-admin.js
    const username = 'admin';
    const plainPassword = 'admin123';

    const existing = await Admin.findOne({ username });
    if (existing) {
      console.log('Admin already exists.');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    const admin = new Admin({ username, password: hashedPassword });

    await admin.save();
    console.log('Admin user created successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();
