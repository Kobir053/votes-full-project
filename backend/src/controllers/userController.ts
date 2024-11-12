import { Response, Request, NextFunction } from "express";
import userModel, { IUser } from "../models/userModel";
import candidateModel from "../models/candidateModel";
import { io } from "../server";

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users: IUser[] = await userModel.find();
        if(!users)
            throw new Error("users not founded");
        res.json({users: users});
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

        const user = await userModel.findById(userId);
        console.log(user?.hasVoted, user!.username);
        if(!user){
            res.status(404).json({message: "user didn't found"});
            return;
        }

        if(user.hasVoted){
            const candidateForRemoveVote = await candidateModel.findById(user.votedFor);
            if(candidateForRemoveVote!.votes != 0)
                await candidateForRemoveVote?.updateOne({votes:candidateForRemoveVote.votes -1});
                await candidateForRemoveVote?.save();  
        }

        const candidateAfterUpdate = await candidateModel.findById(canidateId);

        const updatedUser = await userModel.findByIdAndUpdate(userId, {votedFor: canidateId, hasVoted: true}, {new: true});
        await candidateModel.findByIdAndUpdate(canidateId, {votes: candidateAfterUpdate!.votes + 1});
        const updatedCandidates = await candidateModel.find();
        io.emit("updated-votes", updatedCandidates);
        res.status(200).json({success: true, updatedUser, candidates: updatedCandidates});
    } 
    catch (error: any) {
        next(error);
    }
}