import { z } from "zod";

const studySetCardSchema = z.object({
    id: z.string().optional(),
    term: z
        .string()
        .min(1, "Term can't be empty")
        .max(1000, "This term is too long :("),
    definition: z
        .string()
        .min(1, "Definition can't be empty")
        .max(1000, "This definition is too long :("),
});

export const studySetSchema = z.object({
    id: z.string(),
    name: z
        .string()
        .min(1, "Study set title can't be empty")
        .max(100, "This title is too long :("),
    description: z
        .string()
        .max(280, "This description is too long :(")
        .nullable(),
    subjectId: z.string(),
    areaId: z.string(),
    cards: z.array(studySetCardSchema).min(2),
});

export const createStudySetInput = studySetSchema.omit({ id: true }).extend({
    cards: z.array(studySetCardSchema.omit({ id: true })).min(2),
});
export const updateStudySetInput = studySetSchema;

export const deleteStudySetInput = z.object({
    studySetId: z.string(),
});

export const getStudySetInput = z.object({
    studySetId: z.string(),
    userId: z.string().optional(),
});

export const getFilteredStudySetsInput = z.object({
    subjectId: z.string().optional(),
    areaId: z.string().optional(),
    userId: z.string().optional(),
});
