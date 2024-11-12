import express, { Request, Response, NextFunction } from "express";
import candidateModel, { ICandidate } from "../models/candidateModel";
import userModel from "../models/userModel";

export const getCandidates = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await userModel.findById(req.user?.userId);
        if(!user){
            throw new Error("Unauthorized, please log in to get access");
        }
        
        const candidates: ICandidate[] = await candidateModel.find();
        if(!candidates)
            throw new Error("candidates didn't found");
        res.json({candidates});
    } 
    catch (error: any) {
        next(error);
    }
}