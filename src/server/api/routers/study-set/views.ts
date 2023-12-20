import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { incrementViewInput } from "@/server/schemas/view";

export const studySetViewsRouter = createTRPCRouter({
    incrementViews: protectedProcedure
        .input(incrementViewInput)
        .mutation(async ({ ctx, input }) => {
            return ctx.db.view.upsert({
                where: {
                    userId_studySetId: {
                        studySetId: input.studySetId,
                        userId: ctx.session.user.id,
                    },
                },
                update: {
                    createdAt: new Date(),
                },
                create: {
                    userId: ctx.session.user.id,
                    studySetId: input.studySetId,
                    createdAt: new Date(),
                },
            });
        }),
});
