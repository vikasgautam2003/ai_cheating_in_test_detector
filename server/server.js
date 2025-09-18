// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';

// import connectDB from "./db.js";
// import authRoutes from './routes/authRoutes.js';
// import userRoutes from './routes/userRoutes.js';
// import testRoutes from "./routes/testRoutes.js";
// import resultRoutes from './routes/resultRoutes.js';
// import attemptRoutes from './routes/attemptRoutes.js'

// dotenv.config(); 

// const app = express();

// // Connect MongoDB
// connectDB();

// app.use(cors()); 
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use('/api/auth', authRoutes);
// app.use('/api/user', userRoutes);
// app.use('/api/tests', testRoutes);
// app.use('/api/results', resultRoutes);
// app.use('/api/attempts', attemptRoutes);

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// })

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });




import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

import connectDB from "./db.js";
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import testRoutes from "./routes/testRoutes.js";
import resultRoutes from './routes/resultRoutes.js';
import attemptRoutes from './routes/attemptRoutes.js';
import setupSocket from './socket/index.js';

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

setupSocket(io);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/attempts', attemptRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
