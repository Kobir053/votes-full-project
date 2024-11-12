import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export const authWithBearer = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization as string;
    
    if (!authHeader) {
      console.log("!authHeader");
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];
    let decoded = jwt.verify(token, config.JWT_SECRET) as { userId: string; isAdmin: boolean };
    req.user = decoded;
    
    next();
  } 
  catch (error: any) {
    console.log(error);
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
};