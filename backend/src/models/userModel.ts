import mongoose, { Document, Schema, Types, ObjectId } from "mongoose";

export type objectID = ObjectId;

export interface IUser extends Document {
    _id: Types.ObjectId;
    username: string;
    password: string;
    isAdmin: boolean;
    hasVoted: boolean;
    votedFor: Types.ObjectId | null;
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: [true, "you must have a username"],
        unique: true,
        maxlength: [30, "length of username can't be more than 30 letters"],
        minlength: [2, "length of username must be more than 2 letters"]
    },
    password: {
        type: String,
        required: [true, "you must have a password"],
        minlength: [2, "length of password must be more than 2 charachters"]
    },
    hasVoted: {
        type: Boolean,
        required: true,
        default: false
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    votedFor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate",
        default: null
    }
});

const userModel = mongoose.model("User", userSchema);

export default userModel;