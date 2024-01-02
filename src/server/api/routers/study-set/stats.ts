import { protectedProcedure } from "@/server/api/trpc";
import { getStudySetStatsInput } from "@/server/schemas/stats";

export const studySetStatsRouter = protectedProcedure
    .input(getStudySetStatsInput)
    .query(async ({ ctx, input }) => {
        const averageRating = await ctx.db.rating.aggregate({
            where: {
                studySetId: input.studySetId,
            },
            _avg: {
                rating: true,
            },
        });

        return ctx.db.studySet
            .findUnique({
                where: {
                    id: input.studySetId,
                },
                select: {
                    _count: {
                        select: {
                            comments: {
                                where: {},
                            },
                            ratings: true,
                            views: true,
                        },
                    },
                },
            })
            .then((studySet) =>
                studySet
                    ? {
                          averageRating: averageRating._avg.rating?.toFixed(1),
                          comments: studySet._count.comments,
                          ratings: studySet._count.ratings,
                          views: studySet._count.views,
                      }
                    : undefined,
            );
    });
