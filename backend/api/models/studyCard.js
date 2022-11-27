import { Schema, Types, model } from "mongoose";
import { StudyCardTermSchema } from "./studyCardTerm.js";

export const StudyCardSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    createdBy: {
        type: Types.ObjectId,
        required: true,
        ref: "User",
    },
    createdAt: { type: String, required: true },
    commentsEnabled: {
        type: Boolean,
        default: true,
    },
    terms: { type: [StudyCardTermSchema], required: true },
});

export const StudyCard = model("StudyCard", StudyCardSchema);
