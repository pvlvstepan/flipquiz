import { z } from "zod";

export const getStudySetStatsInput = z.object({
    studySetId: z.string(),
});
