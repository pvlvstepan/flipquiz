import { z } from "zod";

export const incrementViewInput = z.object({
    studySetId: z.string(),
});
