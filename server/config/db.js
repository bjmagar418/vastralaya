import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables immediately
dotenv.config();

const connectDB = async () => {
  try {
    // Force Mongoose to check the Atlas string from your .env
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`📡 MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Database Connection Error: ${error.message}`);
    // Fixed typo: removed '.env' so it exits cleanly without a TypeError
    process.exit(1); 
  }
};

export default connectDB;