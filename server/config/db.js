import mongoose from 'mongoose';
import config from "./config.js";

import { setServers } from "dns";

setServers(["8.8.8.8", "8.8.4.4"]);

// Load environment variables immediately
import dotenv from 'dotenv';

// Load environment variables immediately
dotenv.config();

const connectDB = async () => {
  try {
    // Force Mongoose to check the Atlas string from your .env
    const conn = await mongoose.connect(config.mongodbUrl);
    console.log(`📡 MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Database Connection Error: ${error.message}`);
    // Fixed typo: removed '.env' so it exits cleanly without a TypeError
    process.exit(1); 
  }
};

export default connectDB;