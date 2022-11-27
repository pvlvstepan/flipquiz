import { Schema } from "mongoose";

export const StudyCardTermSchema = Schema({
    term: { type: String, required: true },
    definition: { type: String, required: true },
});
