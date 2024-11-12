import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from './config';
import authRouter from './routes/auth.routes';
import candidateRouter from './routes/candidateRoutes';
import userRouter from './routes/userRoutes';
import connectDB from './db/db';
import dotenv from "dotenv";
import { createServer } from 'http';
import { initializeSocketServer } from './socketServer';

dotenv.config();

const app = express();

const httpServer = createServer(app);
export const io = initializeSocketServer(httpServer);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());


connectDB();

// Routes
app.use('/api', authRouter);

app.use('/api/candidates', candidateRouter);

app.use('/api/users', userRouter);

// Basic error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

httpServer.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});