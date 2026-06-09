import mongoose from 'mongoose';
<<<<<<< HEAD
import config from "./config.js";

import { setServers } from "dns";

setServers(["8.8.8.8", "8.8.4.4"]);

// Load environment variables immediately
=======
import dotenv from 'dotenv';

// Load environment variables immediately
dotenv.config();
>>>>>>> 708d87618764c867cd80ab9372f2c008ae93bd88

const connectDB = async () => {
  try {
    // Force Mongoose to check the Atlas string from your .env
<<<<<<< HEAD
    const conn = await mongoose.connect(config.mongodbUrl);
=======
    const conn = await mongoose.connect(process.env.MONGO_URI);
>>>>>>> 708d87618764c867cd80ab9372f2c008ae93bd88
    console.log(`📡 MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Database Connection Error: ${error.message}`);
    // Fixed typo: removed '.env' so it exits cleanly without a TypeError
<<<<<<< HEAD
=======
    process.exit(1); 
>>>>>>> 708d87618764c867cd80ab9372f2c008ae93bd88
  }
};

export default connectDB;