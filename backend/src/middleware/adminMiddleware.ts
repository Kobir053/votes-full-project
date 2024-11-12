import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export const isAdminMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const isAdmin = req.user?.isAdmin;
    if(isAdmin == true){
        next();
    }
    else{
        res.status(403).json({message: "You don't have access to that route"});
    }
  } 
  catch (error) {
    console.log("error while checking if is admin");
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
};