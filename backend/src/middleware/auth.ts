import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export const authWithBearer = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.body.token;
    if (!authHeader) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1]; // Remove 'Bearer ' prefix
    const decoded = jwt.verify(token, config.JWT_SECRET) as { userId: string; username: string };
    req.user = decoded;
    next();
  } 
  catch (error) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
};

// export const authWithCookie = (req: Request, res: Response, next: NextFunction): void => {
//   try {
//     const token = req.cookies.jwt;
//     if (!token) {
//       res.status(401).json({ message: 'No token provided' });
//       return;
//     }

//     const decoded = jwt.verify(token, config.JWT_SECRET) as { userId: string; username: string };
//     req.user = decoded;
//     next();
//   } 
//   catch (error) {
//     res.status(401).json({ message: 'Invalid token' });
//     return;
//   }
// };