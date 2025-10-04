


// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { createServer } from 'http';
// import { Server } from 'socket.io';


// import connectDB from "./db.js";
// import authRoutes from './routes/authRoutes.js';
// import userRoutes from './routes/userRoutes.js';
// import testRoutes from "./routes/testRoutes.js";
// import resultRoutes from './routes/resultRoutes.js';
// import attemptRoutes from './routes/attemptRoutes.js';
// import setupSocket from './socket/index.js';
// import adminRoutes from './routes/adminRoutes.js';
// import studentRoutes from './routes/studentRoutes.js';
// import complaintRoutes from './routes/complaintRoutes.js';


// dotenv.config();

// const app = express();
// connectDB();

// import cors from "cors";

// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",              
//       "https://sentinalai-jade.vercel.app/", 
//     ],
//     credentials: true, 
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   })
// );


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//      origin: [
//       "http://localhost:3000",              
//       "https://sentinalai-jade.vercel.app/", 
//     ],
//     methods: ["GET", "POST"],
//   },
// });

// setupSocket(io);

// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

// app.use('/api/auth', authRoutes);
// app.use('/api/user', userRoutes);
// app.use('/api/tests', testRoutes);
// app.use('/api/results', resultRoutes);
// app.use('/api/attempts', attemptRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/student', studentRoutes);
// app.use('/api/complaints', complaintRoutes);


// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// const PORT = process.env.PORT || 5000;
// httpServer.listen(PORT, () => {
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
import adminRoutes from './routes/adminRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import complaintRoutes from './routes/complaintRoutes.js';

dotenv.config();

const app = express();
connectDB();

const allowedOrigins = [
  "http://localhost:3000",
  "https://sentinalai-jade.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.options(/.*/, cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
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
app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/complaints', complaintRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
