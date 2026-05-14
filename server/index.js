import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Vastralaya Server is Running with ES Modules!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});