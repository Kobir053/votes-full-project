import mongoose, { Document, Schema, Types } from "mongoose";
import validator from "validator";

export interface ICandidate extends Document {
    _id: Types.ObjectId;
    name: string;
    image: string;
    votes: number;
}

const candidateSchema = new Schema<ICandidate>({
    name: {
        type: String,
        required: [true, "you must have a name"],
        unique: true,
        maxlength: [20, "length of name can't be more than 30 letters"],
        minlength: [2, "length of name must be more than 2 letters"]
    },
    image: {
        type: String,
        required: [true, "you must have an image"],
        validate: [validator.isURL, "invalid image url"],
    },
    votes: {
        type: Number,
        default: 0
    }
});

const candidateModel = mongoose.model("Candidate", candidateSchema);

export default candidateModel;