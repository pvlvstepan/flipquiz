import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
    addCommentInput,
    deleteCommentInput,
    getStudySetCommentsInput,
} from "@/server/schemas/comment";

export const studySetCommentRouter = createTRPCRouter({
    addComment: protectedProcedure
        .input(addCommentInput)
        .mutation(async ({ ctx, input }) => {
            return ctx.db.comment.create({
                data: {
                    userId: ctx.session.user.id,
                    studySetId: input.studySetId,
                    content: input.content,
                },
            });
        }),
    deleteComment: protectedProcedure
        .input(deleteCommentInput)
        .mutation(async ({ ctx, input }) => {
            return ctx.db.comment.update({
                where: { id: input.commentId, userId: ctx.session.user.id },
                data: {
                    deleted: true,
                    deletedAt: new Date(),
                },
            });
        }),
    getStudySetComments: protectedProcedure
        .input(getStudySetCommentsInput)
        .query(async ({ ctx, input }) => {
            return ctx.db.comment.findMany({
                where: {
                    studySet: {
                        id: input.studySetId,
                        deleted: false,
                    },
                    deleted: false,
                },
                select: {
                    id: true,
                    content: true,
                    createdAt: true,
                    user: {
                        select: {
                            id: true,
                            username: true,
                            image: true,
                            role: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "asc",
                },
            });
        }),
});
