import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from "./db.js";
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import testRoutes from "./routes/testRoutes.js";

dotenv.config(); 

const app = express();

// Connect MongoDB
connectDB();

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/tests', testRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
