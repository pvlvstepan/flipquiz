import { Schema, Types, model } from "mongoose";

export const UserSchema = Schema({
    _id: Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/,
    },
    username: {
        type: String,
        required: true,
        match: /^[a-z0-9]+$/i,
    },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["ADMIN", "STUDENT", "TEACHER"],
        default: "STUDENT",
    },
    createdAt: { type: String, required: true },
});

export const User = model("User", UserSchema);
