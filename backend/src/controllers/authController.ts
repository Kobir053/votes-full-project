import express, { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import jwt from "jsonwebtoken";
import { config } from "../config";

export const handleRegister = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        res.status(400).json({ message: 'Username and password are required' });
        return;
      }

      const user = await AuthService.register(username, password);
      res.status(201).json({ message: 'User registered successfully', userId: user._id });
    } 
    catch (error) {
      next(error);
    }
}

export const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const user = await AuthService.validateUser(username, password);
  
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        config.JWT_SECRET,
        { expiresIn: '24h' }
      );
  
      res.json({ token });
    } 
    catch (error: any) {
      res.status(401).json({ message: 'Invalid credentials ' + error.message });
    }
}