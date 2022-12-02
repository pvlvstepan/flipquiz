import { Schema, Types, model } from "mongoose";

export const StudyCardCommentSchema = Schema({
    content: {
        type: String,
        required: true,
    },
    postedBy: {
        type: Types.ObjectId,
        required: true,
        ref: "User",
    },
    studyCardId: {
        type: Types.ObjectId,
        required: true,
        ref: "StudyCard",
    },
    postedAt: { type: String, required: true },
});

export const StudyCardComment = model(
    "StudyCardComment",
    StudyCardCommentSchema
);
