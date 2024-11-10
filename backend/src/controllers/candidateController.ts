import express, { Request, Response, NextFunction } from "express";
import candidateModel, { ICandidate } from "../models/candidateModel";

export const getCandidates = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const candidates: ICandidate[] = await candidateModel.find();
        if(!candidates)
            throw new Error("candidates didn't found");
        res.json({candidates});
    } 
    catch (error: any) {
        next(error);
    }
}