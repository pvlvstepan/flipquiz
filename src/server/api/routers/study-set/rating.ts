import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { addRatingInput } from "@/server/schemas/rating";

export const studySetRatingRouter = createTRPCRouter({
    addRating: protectedProcedure
        .input(addRatingInput)
        .mutation(async ({ ctx, input }) => {
            const rating = await ctx.db.rating.findUnique({
                where: {
                    userId_studySetId: {
                        studySetId: input.studySetId,
                        userId: ctx.session.user.id,
                    },
                },
            });

            const studySet = await ctx.db.studySet.findUnique({
                where: {
                    id: input.studySetId,
                },
                select: {
                    rating: true,
                    ratingsCount: true,
                },
            });

            if (rating) {
                return ctx.db.rating
                    .update({
                        where: {
                            userId_studySetId: {
                                studySetId: input.studySetId,
                                userId: ctx.session.user.id,
                            },
                        },
                        data: {
                            rating: input.rating,
                        },
                    })
                    .then(() =>
                        ctx.db.studySet.update({
                            where: {
                                id: input.studySetId,
                            },
                            data: {
                                rating: studySet
                                    ? {
                                          set:
                                              (studySet.rating *
                                                  studySet.ratingsCount -
                                                  rating.rating +
                                                  input.rating) /
                                              studySet.ratingsCount,
                                      }
                                    : undefined,
                            },
                        }),
                    );
            }

            return ctx.db.rating
                .create({
                    data: {
                        userId: ctx.session.user.id,
                        studySetId: input.studySetId,
                        rating: input.rating,
                    },
                })
                .then(() =>
                    ctx.db.studySet.update({
                        where: {
                            id: input.studySetId,
                        },
                        data: {
                            ratingsCount: {
                                increment: 1,
                            },
                            rating: studySet
                                ? {
                                      set:
                                          (studySet.rating *
                                              studySet.ratingsCount +
                                              input.rating) /
                                          (studySet.ratingsCount + 1),
                                  }
                                : undefined,
                        },
                    }),
                );
        }),
});
