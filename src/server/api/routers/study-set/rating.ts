import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { addRatingInput } from "@/server/schemas/rating";

export const studySetRatingRouter = createTRPCRouter({
    addRating: protectedProcedure
        .input(addRatingInput)
        .mutation(async ({ ctx, input }) => {
            return ctx.db.rating.upsert({
                create: {
                    userId: ctx.session.user.id,
                    studySetId: input.studySetId,
                    rating: input.rating,
                },
                update: {
                    rating: input.rating,
                },
                where: {
                    userId_studySetId: {
                        studySetId: input.studySetId,
                        userId: ctx.session.user.id,
                    },
                },
            });
        }),
});
