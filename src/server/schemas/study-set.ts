import { z } from "zod";

export const studySetSchema = z.object({
    id: z.string().optional(),
    name: z
        .string()
        .min(1, "Study set title can't be empty")
        .max(100, "This title is too long :("),
    description: z
        .string()
        .max(280, "This description is too long :(")
        .optional(),
    subjectId: z.string(),
    areaId: z.string(),
    cards: z.array(
        z.object({
            id: z.string().optional(),
            term: z
                .string()
                .min(1, "Term can't be empty")
                .max(1000, "This term is too long :("),
            definition: z
                .string()
                .min(1, "Definition can't be empty")
                .max(1000, "This definition is too long :("),
        }),
    ),
});
