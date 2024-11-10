import { Response, Request, NextFunction } from "express";
import userModel, { IUser } from "../models/userModel";

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users: IUser[] = await userModel.find();
        if(!users)
            throw new Error("users not founded");
        res.json({data: users});
    } 
    catch (error) {
        next(error);
    }
}