import { protectedProcedure } from "@/server/api/trpc";
import { getStudySetStatsInput } from "@/server/schemas/stats";

export const studySetStatsRouter = protectedProcedure
    .input(getStudySetStatsInput)
    .query(async ({ ctx, input }) => {
        return ctx.db.studySet.findUnique({
            where: {
                id: input.studySetId,
            },
            select: {
                commentsCount: true,
                viewsCount: true,
                ratingsCount: true,
                rating: true,
            },
        });
    });
