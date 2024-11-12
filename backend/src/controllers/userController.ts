import { Response, Request, NextFunction } from "express";
import userModel, { IUser } from "../models/userModel";
import candidateModel from "../models/candidateModel";

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

export const updateVote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        const canidateId = req.body.votedFor;
        if(!canidateId){
            res.status(400).json({message: "you have to enter the credential id that you voted for"});
            return;
        }
        const candidate = await candidateModel.findById(canidateId);
        if(!candidate){
            res.status(404).json({message: "the candidate with id you entered didn't found"});
            return;
        }
        const updatedUser = await userModel.findByIdAndUpdate(userId, {votedFor: canidateId, hasVoted: true}, {new: true});
        await candidateModel.findByIdAndUpdate(canidateId, {votes: candidate.votes + 1});
        res.status(200).json({success: true, updatedUser});
    } 
    catch (error: any) {
        next(error);
    }
}