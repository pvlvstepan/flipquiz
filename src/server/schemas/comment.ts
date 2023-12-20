import { z } from "zod";

export const addCommentInput = z.object({
    studySetId: z.string(),
    content: z.string().min(1).max(500),
});

export const deleteCommentInput = z.object({
    commentId: z.string(),
});

export const getStudySetCommentsInput = z.object({
    studySetId: z.string(),
});
