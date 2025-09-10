import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from "./db.js";
import authRoutes from './routes/authRoutes.js';

dotenv.config(); 

const app = express();

// Connect MongoDB
connectDB();

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
