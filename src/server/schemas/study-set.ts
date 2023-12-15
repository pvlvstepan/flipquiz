import { z } from "zod";

export const studySetSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "Study set title can't be empty"),
    description: z.string().optional(),
    cards: z.array(
        z.object({
            id: z.number().optional(),
            term: z.string().min(1, "Term can't be empty"),
            definition: z.string().min(1, "Definition can't be empty"),
        }),
    ),
});
