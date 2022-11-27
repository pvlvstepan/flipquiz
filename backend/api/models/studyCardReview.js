import { Schema, Types, model } from "mongoose";

export const StudyCardReviewSchema = Schema({
    rating: {
        type: Number,
        required: true,
    },
    ratedBy: {
        type: Types.ObjectId,
        required: true,
        ref: "User",
    },
    studyCardId: {
        type: Types.ObjectId,
        required: true,
        ref: "StudyCard",
    },
    ratedAt: { type: String, required: true },
});

export const StudyCardReview = model("StudyCardReview", StudyCardReviewSchema);
