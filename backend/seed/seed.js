import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.js';
import Expense from '../models/Expense.js';
import { sampleUsers, sampleExpenses } from './seedData.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Expense.deleteMany({});
    console.log('Cleared existing data');

    // Add sample user
    const user = await User.create(sampleUsers[0]);
    console.log('Created demo user');

    // Add sample expenses with user reference
    const expensesWithUser = sampleExpenses.map(expense => ({
      ...expense,
      userId: user._id
    }));
    await Expense.create(expensesWithUser);
    console.log('Created sample expenses');

    console.log('Database seeded successfully!');
    console.log('Demo User Credentials:');
    console.log('Email: demo@example.com');
    console.log('Password: demo123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 