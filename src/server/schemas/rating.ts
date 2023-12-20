import { z } from "zod";

export const addRatingInput = z.object({
    studySetId: z.string(),
    rating: z.number(),
});
