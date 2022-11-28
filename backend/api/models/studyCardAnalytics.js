import { Schema, Types, model } from "mongoose";

export const StudyCardAnalyticsSchema = Schema({
    userId: {
        type: Types.ObjectId,
        required: true,
        ref: "User",
    },
    studyCardId: {
        type: Types.ObjectId,
        required: true,
        ref: "StudyCard",
    },
    createdAt: { type: String, required: true },
});

export const StudyCardAnalytics = model(
    "StudyCardAnalytics",
    StudyCardAnalyticsSchema
);
