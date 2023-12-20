import { z } from "zod";

export const getAreaInput = z.object({
    areaId: z.string(),
});

export const getSubjectInput = z.object({
    subjectId: z.string(),
});
