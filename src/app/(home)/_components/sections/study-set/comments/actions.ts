"use server";

import { revalidatePath } from "next/cache";

import type {
    addCommentInput,
    deleteCommentInput,
} from "@/server/schemas/comment";
import type { z } from "zod";

import { api } from "@/trpc/server";

export const deleteComment = async (
    data: z.infer<typeof deleteCommentInput>,
) => {
    return api.studySet.comment.deleteComment.mutate(data).then((comment) => {
        revalidatePath(`/study-set/${comment.studySetId}`);
    });
};

export const addComment = async (data: z.infer<typeof addCommentInput>) => {
    return api.studySet.comment.addComment
        .mutate({
            content: data.content.replace(/\n{2,}/g, "\n"),
            studySetId: data.studySetId,
        })
        .then((comment) => {
            revalidatePath(`/study-set/${comment.studySetId}`);
        });
};
