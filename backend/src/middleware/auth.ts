import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export const authWithBearer = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.cookies.token;
    if (!authHeader) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    // const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(authHeader, config.JWT_SECRET) as { userId: string; isAdmin: boolean };
    req.user = decoded;
    next();
  } 
  catch (error) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
};