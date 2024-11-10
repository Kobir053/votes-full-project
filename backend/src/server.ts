import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from './config';
import authRouter from './routes/auth.routes';
import connectDB from './db/db';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true // Required for cookies
}));

connectDB();

// Routes
app.use('/api/auth', authRouter);

// Basic error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});